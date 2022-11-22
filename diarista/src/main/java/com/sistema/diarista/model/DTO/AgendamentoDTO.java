package com.sistema.diarista.model.DTO;

import com.sistema.diarista.model.entity.Cliente;
import com.sistema.diarista.model.entity.Diarista;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class AgendamentoDTO {

    private Long id;
    private String criacao;
    private String dataRealizada;
    private Date dataAgendada;
    private String dataAgendadaStr;
    private Cliente cliente;
    private Diarista diarista;
    private Long diaristaId;
    private Integer estrelas;
    private String comentario;
}
