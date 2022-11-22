package com.sistema.diarista.model.repository;

import com.sistema.diarista.model.entity.Cliente;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends GenericCrudRepository<Cliente, Long>{
}
