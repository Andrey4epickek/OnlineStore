package by.effectivesoft.onlinestore.model.dto;

import java.util.List;

public class CartDto {

    private Long id;
    private List<ProductDto> productDtos;

    public CartDto() {
    }

    public CartDto(Long id, List<ProductDto> productDtos) {
        this.id = id;
        this.productDtos = productDtos;
    }

    public List<ProductDto> getProductDtos() {
        return productDtos;
    }

    public void setProductDtos(List<ProductDto> productDtos) {
        this.productDtos = productDtos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
