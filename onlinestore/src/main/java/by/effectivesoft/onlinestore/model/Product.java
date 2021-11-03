package by.effectivesoft.onlinestore.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "products")
public class Product extends BaseEntity{

    @Column(name = "name")
    private String name;
    @Column(name = "price")
    private Integer price;
    @ManyToMany(mappedBy = "products")
    private List<Cart> carts;
    @ManyToMany(mappedBy = "products")
    private List<Order> orders;

    public Product() {

    }

    public Product(Long id,  String name, Integer price) {
        this.name = name;
        this.price = price;
    }

    public List<Cart> getCarts() {
        return carts;
    }

    public void setCarts(List<Cart> carts) {
        this.carts = carts;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + getId() +
                ", name='" + name + '\'' +
                ", price=" + price +
                '}';
    }
}
