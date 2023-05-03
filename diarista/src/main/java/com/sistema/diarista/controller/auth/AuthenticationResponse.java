package com.sistema.diarista.controller.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    private Long id;
    private Long idUser;
    private String token;
    private String username;
    private String isCliente;
    private boolean cadastrado;

}
