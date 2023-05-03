package com.sistema.diarista.controller.auth;

import com.sistema.diarista.controller.security.Role;
import com.sistema.diarista.controller.security.JwtService;
import com.sistema.diarista.model.entity.Cliente;
import com.sistema.diarista.model.entity.Diarista;
import com.sistema.diarista.model.entity.Login;
import com.sistema.diarista.model.repository.ClienteRepository;
import com.sistema.diarista.model.repository.DiaristaRepository;
import com.sistema.diarista.model.repository.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final LoginRepository repository;
    private final DiaristaRepository diaristaRepository;
    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * !Adcionar parâmetros no RegisterRequest para identificar se é Cliente ou Diarista
     * @param request
     * @return
     */
    public AuthenticationResponse register(RegisterRequest request) {
        Role role;
        Boolean isDiarista = request.getIsDiarista();
        if(isDiarista){

            var user = Login.builder()
                    .username(request.getUsername())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.DIARISTA)
                    .build();

            repository.save(user);

            var jwtToken = jwtService.generateToken(user);

            return AuthenticationResponse.builder() //* Vai retornar o token gerado para o usuário
                    .token(jwtToken)
                    .build();

        }

        var user = Login.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.CLIENTE)
                .build();

        repository.save(user);

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder() //* Vai retornar o token gerado para o usuário
                .token(jwtToken)
                .build();

    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        //*Vai fazer o trabalho de autenticação por mim, caso não esteja autenticado vai lançar uma exception
        //*Caso passe desse ponto significa que o username e password estão corretos.
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        var user = repository.findByUsername(request.getUsername()).orElse(null);

        //*Ambos os métodos dessa classe vão gerar um novo token ao criar e ao autenticar um usuário.
        var jwtToken = jwtService.generateToken(user);


        Role role = user.getRole();
        if(role == Role.DIARISTA){
            return AuthenticationResponse.builder()
                    .username(user.getUsername())
                    .id(user.getId())
                    .idUser(user.getDiarista() != null ? user.getDiarista().getId() : null)
                    .isCliente("false")
                    .token(jwtToken)
                    .build();
        }

        return AuthenticationResponse.builder()
                .username(user.getUsername())
                .id(user.getId())
                .idUser(user.getCliente() != null ? user.getCliente().getId() : null)
                .isCliente("true")
                .token(jwtToken)
                .build();
    }

    public boolean hasCadastro(String username) {

        var user = repository.findByUsername(username).orElse(null);

        Role role = user.getRole();
        if(role == Role.DIARISTA){
            return user.getDiarista() != null;
        }

        return user.getCliente() != null;
    }

    public AuthenticationResponse relacionarDiarista(String cpfDiarista, String username){
        var user = repository.findByUsername(username).orElse(null);
        Diarista diarista = diaristaRepository.findByCpf(cpfDiarista).orElse(null);

        if(diarista != null){
            user.setDiarista(diarista);
            repository.save(user);

            return AuthenticationResponse.builder()
                    .username(user.getUsername())
                    .id(user.getId())
                    .idUser(diarista.getId())
                    .build();
        }
        return null;

    }

    public AuthenticationResponse relacionarCliente(String cpfCliente, String username){
        var user = repository.findByUsername(username).orElse(null);
        Cliente cliente = clienteRepository.findByCpf(cpfCliente).orElse(null);

        if(cliente != null){
            user.setCliente(cliente);
            repository.save(user);

            return AuthenticationResponse.builder()
                    .username(user.getUsername())
                    .id(user.getId())
                    .idUser(cliente.getId())
                    .build();
        }

        return null;
    }
}
