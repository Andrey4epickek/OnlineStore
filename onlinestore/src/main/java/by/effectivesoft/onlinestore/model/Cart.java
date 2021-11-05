package by.effectivesoft.onlinestore.model;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "carts")
public class Cart extends BaseEntity {

    @OneToMany(mappedBy = "pk.cart")
    @Valid
    private List<CartProduct> cartProducts = new ArrayList<>();

    public Cart() {
    }

    public Cart(List<CartProduct> cartProducts) {
        this.cartProducts = cartProducts;
    }

    public List<CartProduct> getCartProducts() {
        return cartProducts;
    }

    public void setCartProducts(List<CartProduct> cartProducts) {
        this.cartProducts = cartProducts;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "products=" + cartProducts +
                '}';
    }
}
