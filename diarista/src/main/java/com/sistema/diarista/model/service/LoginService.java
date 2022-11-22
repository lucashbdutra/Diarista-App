package com.sistema.diarista.model.service;

import com.sistema.diarista.model.DTO.LoginDTO;
import com.sistema.diarista.model.entity.Login;
import com.sistema.diarista.model.repository.LoginRepository;
import org.springframework.beans.InvalidPropertyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    @Transactional(rollbackFor = Exception.class)
    public Login createLogin(Login login){

        List<Login> logins = loginRepository.findAll();
        for(Login log : logins){
            if(Objects.equals(log.getUsername(), login.getUsername())){
                throw new IllegalStateException();
            }
        }

        try {
            String encoder = new BCryptPasswordEncoder().encode(login.getPassword());
            login.setPassword(encoder);

            loginRepository.saveAndFlush(login);


        } catch (Exception e){

            return null;
        }
        return login;
    }

    public LoginDTO authenticateLogin(LoginDTO login){
        Login client = loginRepository.findByUsername(login.getUsername()).get();

        String[] firstName = login.getUsername().split(" ");
        login.setUsername(firstName[0]);

        boolean passTest = new BCryptPasswordEncoder().matches(login.getPassword(), client.getPassword());

        if(passTest){
            login.setIsDiarista(client.getIsDiarista());
            if(client.getCliente() == null){
                login.setId(client.getDiarista().getId());
            } else {
                login.setId(client.getCliente().getId());
            }

            return login;
        }
        return null;
    }
}
