package com.sistema.diarista.controller.rest;

import com.sistema.diarista.model.DTO.AgendamentoDTO;
import com.sistema.diarista.model.entity.Agendamento;
import com.sistema.diarista.model.service.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rest/agendamentos")
public class AgendamentoRest extends GenericCrudRest<Agendamento, Long, AgendamentoService>{

    @Autowired
    private AgendamentoService agendamentoService;

    @PostMapping("/create")
    public ResponseEntity<AgendamentoDTO> create(@RequestBody AgendamentoDTO agendamentoDTO){

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(agendamentoService.criarAgendamento(agendamentoDTO));
    }

    @GetMapping("/search/cliente/{id}")
    public ResponseEntity<List<AgendamentoDTO>> buscaPorClienteId(@PathVariable Long id){

        return ResponseEntity.ok()
                .body(agendamentoService.listarPorClienteId(id));
    }

    @GetMapping("/search/diarista/{id}")
    public ResponseEntity<List<AgendamentoDTO>> buscaPorDiaristaId(@PathVariable Long id){

        return ResponseEntity.ok()
                .body(agendamentoService.listarPorDiaristaId(id));
    }

    @GetMapping("/visitaRealizada/{id}")
    public ResponseEntity<AgendamentoDTO> visitaRealizada(@PathVariable Long id){


        return ResponseEntity.ok()
                .body(agendamentoService.visitaRealizada(id));
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<AgendamentoDTO> visitaRealizada(@RequestBody AgendamentoDTO agendamentoDTO,
                                                          @PathVariable Long id){


        return ResponseEntity.ok()
                .body(agendamentoService.editarAgendamento(agendamentoDTO, id));
    }

    @PostMapping("/avaliacao/{idDiarista}")
    public ResponseEntity<AgendamentoDTO> avaliacao(@PathVariable Long idDiarista,
                                                    @RequestBody AgendamentoDTO agendamentoDTO ){

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(agendamentoService.salvarAvaliacao(idDiarista, agendamentoDTO));
    }

}
