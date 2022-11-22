package com.sistema.diarista.controller.rest;

import com.sistema.diarista.model.entity.Diarista;
import com.sistema.diarista.model.service.DiaristaService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("rest/diaristas")
public class DiaristaRest extends GenericCrudRest<Diarista, Long, DiaristaService>{
}
