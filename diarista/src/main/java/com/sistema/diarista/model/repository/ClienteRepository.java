package com.sistema.diarista.model.repository;

import com.sistema.diarista.model.entity.Cliente;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClienteRepository extends GenericCrudRepository<Cliente, Long>{

    Optional<Cliente> findByCpf(String cpf);
}
