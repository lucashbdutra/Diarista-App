package com.sistema.diarista.controller.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rest/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    /**
     * *Em ambos os métodos ele vai registrar ou autenticar um usuário e retornar um token criado para aquele user.
     * @param request
     * @return
     */
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(service.register(request));

    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(service.authenticate(request));
    }


    @GetMapping("/hasCadastro/{username}")
    public ResponseEntity<Boolean> hasCadastro(@PathVariable String username){
        return ResponseEntity.ok(service.hasCadastro(username));
    }

    @PutMapping("/relacionarDiarista")
    public ResponseEntity<AuthenticationResponse>  relacionarDiarista(@RequestParam String cpfDiarista, @RequestParam String username){

        return ResponseEntity.ok(service.relacionarDiarista(cpfDiarista, username));
    }

    @PutMapping("/relacionarCliente")
    public ResponseEntity<AuthenticationResponse>  relacionarCliente(@RequestParam String cpfCliente, @RequestParam String username){

        return ResponseEntity.ok(service.relacionarCliente(cpfCliente, username));
    }


}
