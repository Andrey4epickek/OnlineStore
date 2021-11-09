package by.effectivesoft.onlinestore.dao;

import by.effectivesoft.onlinestore.model.SubReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubReviewDao extends JpaRepository<SubReview, Long> {
}
