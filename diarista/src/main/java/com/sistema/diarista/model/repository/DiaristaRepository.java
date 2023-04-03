package com.sistema.diarista.model.repository;

import com.sistema.diarista.model.entity.Cliente;
import com.sistema.diarista.model.entity.Diarista;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DiaristaRepository extends GenericCrudRepository<Diarista, Long>{

    Optional<Diarista> findByCpf(String cpf);
}
