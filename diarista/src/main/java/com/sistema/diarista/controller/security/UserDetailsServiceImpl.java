package com.sistema.diarista.controller.security;


import com.sistema.diarista.model.entity.Login;
import com.sistema.diarista.model.repository.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    public final LoginRepository loginRepository;

    @Override
    public UserDetails loadUserByUsername(String username){

        Optional<Login> login = loginRepository.findByUsername(username);

        return login.orElse(null);
    }


}
