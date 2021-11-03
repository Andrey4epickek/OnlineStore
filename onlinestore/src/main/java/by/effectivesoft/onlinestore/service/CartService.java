package by.effectivesoft.onlinestore.service;

import by.effectivesoft.onlinestore.dao.CartDao;
import by.effectivesoft.onlinestore.dao.ProductDao;
import by.effectivesoft.onlinestore.exceptions.ServiceException;
import by.effectivesoft.onlinestore.model.Cart;
import by.effectivesoft.onlinestore.model.Product;
import by.effectivesoft.onlinestore.model.dto.CartDto;
import by.effectivesoft.onlinestore.model.dto.ProductDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {

    private final CartDao cartDao;
    private final ProductDao productDao;
    private final ModelMapper mapper;

    @Autowired
    public CartService(CartDao cartDao, ProductDao productDao, ModelMapper mapper) {
        this.cartDao = cartDao;
        this.productDao = productDao;
        this.mapper = mapper;
    }

    public List<CartDto> getAllCarts(Integer page, Integer size, String sortBy, String direction) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.Direction.fromString(direction), sortBy);
        List<Cart> carts = cartDao.findAll(pageRequest).toList();
        if (carts.isEmpty()) {
            throw new ServiceException("There is no carts");
        }
        return carts.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public CartDto createCart() {
        Cart cart = cartDao.save(new Cart());
        return convertToDto(cart);
    }

    public Integer countTotalPrice(Long cartId) {
        Cart cart = cartDao.findById(cartId).orElseThrow(() -> new ServiceException("Cart with Id " + cartId + " not found"));
        List<Product> products = cart.getProducts();
        Integer total = 0;
        for (Product product : products) {
            total += product.getPrice();
        }
        return total;
    }

    public CartDto getCartById(Long id) {
        CartDto cartDto = new CartDto();
        Cart cart = cartDao.findById(id).orElseThrow(() -> new ServiceException("Cart with Id " + id + " not found"));
        cartDto.setId(cart.getId());
        cartDto.setProductDtos(cart.getProducts().stream()
                .map(this::convertToDtoProduct)
                .collect(Collectors.toList()));
        return cartDto;
    }

    public CartDto addProductToCart(Long cartId, Long productId) {
        Cart cart = cartDao.findById(cartId).orElseThrow(() -> new ServiceException("Cart with Id " + cartId + " not found"));
        Product product = productDao.findById(productId).orElseThrow(() -> new ServiceException("Product with Id " + productId + " not found"));
        cart.getProducts().add(product);
        return convertToDto(cartDao.save(cart));
    }

    public CartDto deleteProductFromCart(Long cartId, Long productId) {
        Cart cart = cartDao.findById(cartId).orElseThrow(() -> new ServiceException("Cart with Id " + cartId + " not found"));
        Product product = productDao.findById(productId).orElseThrow(() -> new ServiceException("Product with Id " + productId + " not found"));
        cart.getProducts().remove(product);
        return convertToDto(cartDao.save(cart));
    }

    public CartDto clearCart(Long id) {
        Cart cart = cartDao.findById(id).orElseThrow(() -> new ServiceException("Cart with Id " + id + " not found"));
        cart.getProducts().clear();
        return convertToDto(cartDao.save(cart));
    }

    private CartDto convertToDto(Cart cart) {
        return mapper.map(cart, CartDto.class);
    }

    private Product convertToProduct(ProductDto productDto) {
        return mapper.map(productDto, Product.class);
    }

    private ProductDto convertToDtoProduct(Product product) {
        return mapper.map(product, ProductDto.class);
    }

}
