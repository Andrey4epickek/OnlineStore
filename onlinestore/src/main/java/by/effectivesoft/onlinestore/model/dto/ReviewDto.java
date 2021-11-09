package by.effectivesoft.onlinestore.model.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.List;

public class ReviewDto {

    private Long id;
    @NotBlank
    @Pattern(regexp = "[a-zA-Z]{1,100}")
    private String description;
    @Min(1)
    @Max(5)
    private Integer score;
    private String createdBy;
    private List<SubReviewDto> subReviewDtos;

    public ReviewDto() {
    }

    public ReviewDto(Long id, String description, Integer score, String createdBy) {
        this.id = id;
        this.description = description;
        this.score = score;
        this.createdBy = createdBy;
    }

    public ReviewDto(Long id, String description, Integer score, String createdBy, List<SubReviewDto> subReviewDtos) {
        this.id = id;
        this.description = description;
        this.score = score;
        this.createdBy = createdBy;
        this.subReviewDtos = subReviewDtos;
    }

    public List<SubReviewDto> getSubReviewDtos() {
        return subReviewDtos;
    }

    public void setSubReviewDtos(List<SubReviewDto> subReviewDtos) {
        this.subReviewDtos = subReviewDtos;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
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

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }
}
