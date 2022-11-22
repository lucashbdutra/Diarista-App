package com.sistema.diarista.model.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Agendamento extends GenericEntity<Long>{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date criacao;
    private Date dataRealizada;
    private Integer estrelas;
    private String comentario;
    private Date dataAgendada;
    @ManyToOne
    @JoinColumn(name = "fk_diarista_id")
    private Diarista diarista;
    @ManyToOne
    @JoinColumn(name = "fk_cliente_id")
    private Cliente cliente;
}
