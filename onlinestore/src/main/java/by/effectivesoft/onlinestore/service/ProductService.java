package by.effectivesoft.onlinestore.service;

import by.effectivesoft.onlinestore.dao.ProductDao;
import by.effectivesoft.onlinestore.exceptions.ServiceException;
import by.effectivesoft.onlinestore.model.Product;
import by.effectivesoft.onlinestore.model.dto.ProductDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Validated
public class ProductService {

    private final ProductDao productDao;
    private final ModelMapper mapper;

    @Autowired
    public ProductService(ProductDao productDao, ModelMapper mapper) {
        this.productDao = productDao;
        this.mapper = mapper;
    }

    public ProductDto createProduct(@Valid ProductDto productDto) {
        Product product = productDao.save(new Product(productDto.getId(), productDto.getName(), productDto.getPrice()));

        return convertToDto(product);
    }

    public List<ProductDto> getAllProducts(Integer page, Integer size, String sortBy, String direction) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.Direction.fromString(direction), sortBy);
        List<Product> products = productDao.findAll(pageRequest).toList();
        if (products.isEmpty()) {
            throw new ServiceException("There is no products");
        }
        return products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Long count() {
        return productDao.count();
    }

    public ProductDto getProductById(Long id) {
        return convertToDto(productDao.findById(id)
                .orElseThrow(() -> new ServiceException("Product with Id " + id + " not found")));
    }

    public ProductDto updateProduct(@Valid ProductDto productDto) {
        Product product = productDao.findById(productDto.getId()).orElseThrow(() -> new ServiceException("Product with Id " + productDto.getId() + " not found"));
        product.setName(productDto.getName());
        product.setPrice(productDto.getPrice());
        return convertToDto(productDao.save(product));
    }

    public void deleteProduct(Long productId) {
        productDao.deleteById(productId);
    }

    private ProductDto convertToDto(Product product) {
        return mapper.map(product, ProductDto.class);
    }
}
