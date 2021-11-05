package by.effectivesoft.onlinestore.dao;

import by.effectivesoft.onlinestore.model.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderProductDao extends JpaRepository<OrderProduct, Long> {
}
