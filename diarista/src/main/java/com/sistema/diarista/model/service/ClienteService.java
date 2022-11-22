package com.sistema.diarista.model.service;

import com.sistema.diarista.model.entity.Cliente;
import com.sistema.diarista.model.repository.ClienteRepository;
import org.springframework.stereotype.Service;

@Service
public class ClienteService extends GenericCrudService<Cliente, Long, ClienteRepository>{
}
