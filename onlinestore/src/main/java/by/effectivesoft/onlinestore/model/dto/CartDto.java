package by.effectivesoft.onlinestore.model.dto;

import java.util.List;

public class CartDto {

    private Long id;
    private List<CartProductDto> productDtos;

    public CartDto() {
    }

    public CartDto(Long id, List<CartProductDto> productDtos) {
        this.id = id;
        this.productDtos = productDtos;
    }

    public List<CartProductDto> getProductDtos() {
        return productDtos;
    }

    public void setProductDtos(List<CartProductDto> productDtos) {
        this.productDtos = productDtos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
