package com.sistema.diarista.model.service;

import com.sistema.diarista.model.entity.Diarista;
import com.sistema.diarista.model.repository.DiaristaRepository;
import org.springframework.stereotype.Service;

@Service
public class DiaristaService extends GenericCrudService<Diarista, Long, DiaristaRepository>{
}
