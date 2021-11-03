package by.effectivesoft.onlinestore.dao;

import by.effectivesoft.onlinestore.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDao extends JpaRepository<Order,Long> {
}
