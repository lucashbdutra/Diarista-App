package com.sistema.diarista.model.repository;

import com.sistema.diarista.model.entity.Agendamento;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AgendamentoRepository extends GenericCrudRepository<Agendamento, Long>{

    Optional<List<Agendamento>> findByDiaristaId(Long idDiarista);
    Optional<List<Agendamento>> findByDiaristaNome(String nome);
    Optional<List<Agendamento>> findByClienteId(Long idCliente);
    Optional<List<Agendamento>> findByClienteNome(String nome);
}
