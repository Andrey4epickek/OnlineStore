package by.effectivesoft.onlinestore.controller;

import by.effectivesoft.onlinestore.model.dto.ProductDto;
import by.effectivesoft.onlinestore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<ProductDto> getAllProducts(@RequestParam Integer page, @RequestParam Integer size, @RequestParam String sortBy, @RequestParam String direction) {
        return productService.getAllProducts(page, size, sortBy, direction);
    }

    @GetMapping("/total")
    public Long getTotal() {
        return productService.count();
    }

    @GetMapping("/{id}")
    public ProductDto getProductById(@PathVariable("id") Long id) {
        return productService.getProductById(id);
    }

    @PostMapping
    public ProductDto createProduct( @RequestBody ProductDto productDto) {
            return productService.createProduct(productDto);
    }

    @PutMapping
    public ProductDto updateProduct(@RequestBody ProductDto productDto) {
        return productService.updateProduct(productDto);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable("id") Long id) {
        productService.getProductById(id);
        productService.deleteProduct(id);
    }
}
