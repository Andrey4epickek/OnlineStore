package by.effectivesoft.onlinestore.model.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class ProductDto {

    private Long id;
    @NotBlank
    @Pattern(regexp = "[a-zA-Z]{1,50}")
    private String name;
    @Min(1)
    @Max(100500)
    private Integer price;

    public ProductDto() {
    }

    public ProductDto(Long id, String name, Integer price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}
