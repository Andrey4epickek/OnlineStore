package by.effectivesoft.onlinestore.model.dto;

import by.effectivesoft.onlinestore.model.OrderProductPK;

public class OrderProductDto {

    private OrderProductPK pk;

    private Integer quantity;

    public OrderProductDto() {
    }

    public OrderProductDto(OrderProductPK pk, Integer quantity) {
        this.pk = pk;
        this.quantity = quantity;
    }

    public OrderProductPK getPk() {
        return pk;
    }

    public void setPk(OrderProductPK pk) {
        this.pk = pk;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
