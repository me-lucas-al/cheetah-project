package bra.ifsp.edu.br.cheetah.repository;

import bra.ifsp.edu.br.cheetah.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
