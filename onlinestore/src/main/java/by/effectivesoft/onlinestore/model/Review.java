package by.effectivesoft.onlinestore.model;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "reviews")
public class Review extends BaseEntity {

    private String description;
    private Integer score;
    @OneToMany
    @JoinColumn(name = "review_id")
    private List<SubReview> subReviews = new ArrayList<>();

    public Review() {
    }

    public Review(String description, Integer score) {
        this.description = description;
        this.score = score;
    }

    public Review(String description, Integer score, List<SubReview> subReviews) {
        this.description = description;
        this.score = score;
        this.subReviews = subReviews;
    }

    public List<SubReview> getSubReviews() {
        return subReviews;
    }

    public void setSubReviews(List<SubReview> subReviews) {
        this.subReviews = subReviews;
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

    @Override
    public String toString() {
        return "Review{" +
                "description='" + description + '\'' +
                ", score=" + score +
                '}';
    }
}
