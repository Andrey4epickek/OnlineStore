package by.effectivesoft.onlinestore.controller;

import by.effectivesoft.onlinestore.model.dto.CartDto;
import by.effectivesoft.onlinestore.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/carts")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/total")
    public Integer totalPrice(Principal principal) {
        return cartService.countTotalPrice(principal.getName());
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    @PutMapping("/{productId}")
    public void addProductToCart(Principal principal, @PathVariable("productId") Long productId) {
        cartService.addProductToCart(principal.getName(), productId);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    @PutMapping("/emptyCart/{cartId}")
    public CartDto clearCart(@PathVariable("cartId") Long id) {
        return cartService.clearCart(id);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    @PutMapping("/product-removal/{cartId}/{productId}")
    public CartDto deleteProductFromCart(@PathVariable("cartId") Long cartId, @PathVariable("productId") Long productId) {
        return cartService.deleteProductFromCart(cartId, productId);
    }

    @GetMapping
    public CartDto getCartByUserEmail(Principal principal) {
        return cartService.getCartByUserEmail(principal.getName());
    }

}
