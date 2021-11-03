package by.effectivesoft.onlinestore.dao;

import by.effectivesoft.onlinestore.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartDao extends JpaRepository<Cart,Long> {
}
