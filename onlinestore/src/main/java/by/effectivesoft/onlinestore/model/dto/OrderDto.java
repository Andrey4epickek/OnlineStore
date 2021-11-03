package by.effectivesoft.onlinestore.model.dto;

import by.effectivesoft.onlinestore.model.OrderStatus;

import java.util.List;

public class OrderDto {

    private Long id;
    private List<ProductDto> productDtos;
    private Integer count;
    private Integer price;
    private OrderStatus status;
    private String createdBy;

    public OrderDto() {
    }

    public OrderDto(Long id, List<ProductDto> productDtos, Integer count, Integer price, OrderStatus status, String createdBy) {
        this.id = id;
        this.productDtos = productDtos;
        this.count = count;
        this.price = price;
        this.status = status;
        this.createdBy = createdBy;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<ProductDto> getProductDtos() {
        return productDtos;
    }

    public void setProductDtos(List<ProductDto> productDtos) {
        this.productDtos = productDtos;
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
}
