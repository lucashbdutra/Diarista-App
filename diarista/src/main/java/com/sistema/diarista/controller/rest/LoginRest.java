package com.sistema.diarista.controller.rest;

import com.sistema.diarista.model.DTO.LoginDTO;
import com.sistema.diarista.model.entity.Login;
import com.sistema.diarista.model.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("rest/login")
public class LoginRest {

    @Autowired
    public LoginService loginService;

    @PostMapping
    public ResponseEntity<Login> createUser(@RequestBody Login login){

        return ResponseEntity.status(HttpStatus.CREATED).body(loginService.createLogin(login));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<LoginDTO> authenticate(@RequestBody LoginDTO loginDTO){

        return ResponseEntity.ok().body(loginService.authenticateLogin(loginDTO));
    }
}