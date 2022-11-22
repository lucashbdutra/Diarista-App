package com.sistema.diarista.model.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
public class Diarista extends GenericEntity<Long>{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String cpf;
    private String contato;
    private String endereco;
    private String email;
    private String pix;
    private Double avaliacao;
    private Integer estrelas;
    private Integer numAvaliacoes;

}
