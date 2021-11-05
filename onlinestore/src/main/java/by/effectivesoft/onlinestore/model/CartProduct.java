package by.effectivesoft.onlinestore.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Transient;

@Entity
public class CartProduct {

    @EmbeddedId
    @JsonIgnore
    private CartProductPK pk;

    @Column(nullable = false)
    private Integer quantity;

    public CartProduct() {
    }

    public CartProduct(Cart cart, Product product, Integer quantity) {
        pk = new CartProductPK();
        pk.setCart(cart);
        pk.setProduct(product);
        this.quantity = quantity;
    }

    @Transient
    public Product getProduct() {
        return this.pk.getProduct();
    }

    public CartProductPK getPk() {
        return pk;
    }

    public void setPk(CartProductPK pk) {
        this.pk = pk;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
