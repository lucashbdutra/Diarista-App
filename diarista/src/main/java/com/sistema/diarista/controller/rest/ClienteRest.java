package com.sistema.diarista.controller.rest;

import com.sistema.diarista.model.entity.Cliente;
import com.sistema.diarista.model.service.ClienteService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("rest/clientes")
public class ClienteRest extends GenericCrudRest<Cliente, Long, ClienteService> {
}
