package com.sistema.diarista.model.service;

import com.sistema.diarista.model.DTO.LoginDTO;
import com.sistema.diarista.model.entity.Cliente;
import com.sistema.diarista.model.entity.Diarista;
import com.sistema.diarista.model.entity.Login;
import com.sistema.diarista.model.repository.ClienteRepository;
import com.sistema.diarista.model.repository.DiaristaRepository;
import com.sistema.diarista.model.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;
    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private DiaristaRepository diaristaRepository;


    public LoginDTO createCliente(String cpfCliente, String username) {
        Login login = loginRepository.findByUsername(username).orElse(null);
        Cliente cliente = clienteRepository.findByCpf(cpfCliente).orElse(null);

        if(login == null && cliente == null){
            throw new NullPointerException();
        }

        login.setCliente(cliente);
        loginRepository.save(login);
        LoginDTO loginDTO = LoginDTO.builder()
                .id(cliente.getId())
                .username(cliente.getNome())
                .build();
        return loginDTO;

    }

    public LoginDTO createDiarista(String cpfDiarista, String username) {
        Login login = loginRepository.findByUsername(username).orElse(null);
        Diarista diarista = diaristaRepository.findByCpf(cpfDiarista).orElse(null);

        if(login == null && diarista == null){
            throw new NullPointerException();
        }

        login.setDiarista(diarista);
        loginRepository.save(login);
        LoginDTO loginDTO = LoginDTO.builder()
                .id(diarista.getId())
                .username(diarista.getNome())
                .build();
        return loginDTO;

    }
}


