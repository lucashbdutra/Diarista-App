package com.sistema.diarista.model.repository;

import com.sistema.diarista.model.entity.Diarista;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaristaRepository extends GenericCrudRepository<Diarista, Long>{
}
