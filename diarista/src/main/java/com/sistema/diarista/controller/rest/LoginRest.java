package com.sistema.diarista.controller.rest;

import com.sistema.diarista.model.DTO.LoginDTO;
import com.sistema.diarista.model.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("rest/login")
public class LoginRest {

    @Autowired
    public LoginService loginService;

    @PutMapping("/relacionarCliente")
    public ResponseEntity<LoginDTO> createCliente(@RequestParam String cpfCliente, @RequestParam String username){

        return ResponseEntity.ok().body(loginService.createCliente(cpfCliente, username));
    }

    @PutMapping("/relacionarDiarista")
    public ResponseEntity<LoginDTO> createDiarista(@RequestParam String cpfDiarista, @RequestParam String username){

        return ResponseEntity.ok().body(loginService.createDiarista(cpfDiarista, username));
    }
}