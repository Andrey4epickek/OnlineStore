package by.effectivesoft.onlinestore.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
public class Product extends BaseEntity {

    @Column(name = "name")
    private String name;
    @Column(name = "price")
    private Integer price;
    @OneToMany
    @JoinColumn(name = "product_id")
    private List<Review> review = new ArrayList<>();

    public Product() {

    }

    public Product(String name, Integer price) {
        this.name = name;
        this.price = price;
    }

    public Product(String name, Integer price, List<Review> review) {
        this.name = name;
        this.price = price;
        this.review = review;
    }

    public List<Review> getReview() {
        return review;
    }

    public void setReview(List<Review> review) {
        this.review = review;
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
                "name='" + name + '\'' +
                ", price=" + price +
                ", review=" + review +
                '}';
    }
}
