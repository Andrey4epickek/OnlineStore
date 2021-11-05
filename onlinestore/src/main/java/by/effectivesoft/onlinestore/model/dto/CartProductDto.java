package by.effectivesoft.onlinestore.model.dto;

import by.effectivesoft.onlinestore.model.CartProductPK;

public class CartProductDto {

    private CartProductPK pk;

    private Integer quantity;

    public CartProductDto() {
    }

    public CartProductDto(CartProductPK pk, Integer quantity) {
        this.pk = pk;
        this.quantity = quantity;
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
