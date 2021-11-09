package by.effectivesoft.onlinestore.model;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "subreviews")
public class SubReview extends BaseEntity{

    private String description;

    public SubReview() {
    }

    public SubReview(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "SubReview{" +
                "description='" + description + '\'' +
                '}';
    }
}
