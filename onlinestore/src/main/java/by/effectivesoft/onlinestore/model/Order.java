package by.effectivesoft.onlinestore.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order extends BaseEntity {
    @ManyToMany
    @JoinTable(name = "order_products",
            joinColumns = {@JoinColumn(name = "order_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "product_id", referencedColumnName = "id")})
    private List<Product> products;
    @Column(name = "count")
    private Integer count;
    @Column(name = "price")
    private Integer price;
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private OrderStatus status;

    public Order() {
    }

    public Order(Long id, List<Product> products, Integer count, Integer price, OrderStatus status) {
        this.products = products;
        this.count = count;
        this.price = price;
        this.status = status;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Order{" +
                "products=" + products +
                ", count=" + count +
                ", price=" + price +
                '}';
    }
}
