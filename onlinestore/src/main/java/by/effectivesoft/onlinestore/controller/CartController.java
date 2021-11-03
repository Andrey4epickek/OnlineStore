package by.effectivesoft.onlinestore.controller;

import by.effectivesoft.onlinestore.model.dto.CartDto;
import by.effectivesoft.onlinestore.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carts")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping
    public CartDto createCart() {
        return cartService.createCart();
    }

    @GetMapping("/total/{cartId}")
    public Integer totalPrice(@PathVariable("cartId") Long cartId) {
        return cartService.countTotalPrice(cartId);
    }

    @PutMapping("/{cartId}/{productId}")
    public CartDto addProductToCart(@PathVariable("cartId") Long cartId, @PathVariable("productId") Long productId) {
        return cartService.addProductToCart(cartId, productId);
    }

    @PutMapping("/emptyCart/{cartId}")
    public CartDto clearCart(@PathVariable("cartId") Long id) {
        return cartService.clearCart(id);
    }

    @PutMapping("/product-removal/{cartId}/{productId}")
    public CartDto deleteProductFromCart(@PathVariable("cartId") Long cartId, @PathVariable("productId") Long productId) {
        return cartService.deleteProductFromCart(cartId, productId);
    }

    @GetMapping("/{id}")
    public CartDto getCartById(@PathVariable("id") Long id) {
        return cartService.getCartById(id);
    }

}
