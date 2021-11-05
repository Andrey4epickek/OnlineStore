package by.effectivesoft.onlinestore.dao;

import by.effectivesoft.onlinestore.model.CartProduct;
import by.effectivesoft.onlinestore.model.CartProductPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartProductDao extends JpaRepository<CartProduct, Long> {

    Optional<CartProduct> findByPk(CartProductPK cartProductPK);

}
