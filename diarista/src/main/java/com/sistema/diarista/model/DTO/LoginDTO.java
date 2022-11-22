package com.sistema.diarista.model.DTO;

import com.sistema.diarista.model.entity.Cliente;
import com.sistema.diarista.model.entity.Diarista;
import lombok.Data;

@Data
public class LoginDTO {
    private Long id;
    private String username;
    private String password;
    private Boolean isDiarista;
    private Cliente cliente;
    private Diarista diarista;
}
