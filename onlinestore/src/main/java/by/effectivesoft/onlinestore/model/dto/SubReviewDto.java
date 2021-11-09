package by.effectivesoft.onlinestore.model.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class SubReviewDto {
    private Long id;
    @NotBlank
    @Pattern(regexp = "[a-zA-Z]{1,100}")
    private String description;
    private String createdBy;

    public SubReviewDto() {
    }

    public SubReviewDto(Long id, String description, String createdBy) {
        this.id = id;
        this.description = description;
        this.createdBy = createdBy;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
}
