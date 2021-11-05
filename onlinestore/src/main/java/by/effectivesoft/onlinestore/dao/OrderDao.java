package by.effectivesoft.onlinestore.dao;

import by.effectivesoft.onlinestore.model.Cart;
import by.effectivesoft.onlinestore.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderDao extends JpaRepository<Order, Long> {

    Page<Order> findByCreatedBy(String userEmail, Pageable pageable);

    Optional<Order> findByCreatedBy(String userEmail);

}
