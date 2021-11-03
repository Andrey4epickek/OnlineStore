package by.effectivesoft.onlinestore.dao;

import by.effectivesoft.onlinestore.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleDao extends JpaRepository<Role, Long> {
}
