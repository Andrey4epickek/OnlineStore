package by.effectivesoft.onlinestore.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "cart")
public class Cart extends BaseEntity {
    @ManyToMany
    @JoinTable(name = "cart_products",
            joinColumns = {@JoinColumn(name = "cart_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "product_id", referencedColumnName = "id")})
    private List<Product> products;

    public Cart() {
    }

    public Cart(Long id, List<Product> products) {
        this.products = products;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "products=" + products +
                '}';
    }
}
