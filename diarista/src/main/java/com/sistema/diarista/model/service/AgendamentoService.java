package com.sistema.diarista.model.service;

import com.sistema.diarista.model.DTO.AgendamentoDTO;
import com.sistema.diarista.model.entity.Agendamento;
import com.sistema.diarista.model.entity.Cliente;
import com.sistema.diarista.model.entity.Diarista;
import com.sistema.diarista.model.repository.AgendamentoRepository;
import com.sistema.diarista.model.repository.ClienteRepository;
import com.sistema.diarista.model.repository.DiaristaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AgendamentoService extends GenericCrudService<Agendamento, Long, AgendamentoRepository>{

    @Autowired
    private AgendamentoRepository agendamentoRepository;
    @Autowired
    private DiaristaRepository diaristaRepository;

    private final static DateFormat DF = new SimpleDateFormat("dd/MM/yyyy HH:mm");

    public List<AgendamentoDTO> listarPorClienteId(Long id){

        Optional<List<Agendamento>> list = agendamentoRepository.findByClienteId(id);
        List<AgendamentoDTO> dtoList = new ArrayList<>();

        if(list.isPresent()){
            Date dataRealizada;
            Date dataCriacao;
            Date dataAgendada;
            String format;
            for(Agendamento a : list.get()){
                AgendamentoDTO agendamentoDTO = new AgendamentoDTO();
                if(a.getDataRealizada() != null){
                    format = DF.format(a.getDataRealizada());
                    agendamentoDTO.setDataRealizada(format);
                }
                agendamentoDTO.setCriacao(DF.format(a.getCriacao()));
                agendamentoDTO.setDataAgendadaStr(DF.format(a.getDataAgendada()));
                agendamentoDTO.setDataAgendada(a.getDataAgendada());
                agendamentoDTO.setCliente(a.getCliente());
                agendamentoDTO.setDiarista(a.getDiarista());
                agendamentoDTO.setComentario(a.getComentario());
                agendamentoDTO.setEstrelas(a.getEstrelas());
                agendamentoDTO.setId(a.getId());
                dtoList.add(agendamentoDTO);
            }

        }

        return dtoList;
    }

    public AgendamentoDTO visitaRealizada(Long id){
        Date date = new Date();
        Agendamento agendamento = this.agendamentoRepository.findById(id).get();

        agendamento.setDataRealizada(date);
        agendamentoRepository.save(agendamento);

        AgendamentoDTO agendamentoDTO = new AgendamentoDTO();
        BeanUtils.copyProperties(agendamento, agendamentoDTO);

        return agendamentoDTO;

    }

    public List<AgendamentoDTO> listarPorDiaristaId(Long id){

        Optional<List<Agendamento>> list = agendamentoRepository.findByDiaristaId(id);

        List<AgendamentoDTO> dtoList = new ArrayList<>();

        if(list.isPresent()){
            Date dataRealizada;
            Date dataCriacao;
            Date dataAgendada;
            String format;
            for(Agendamento a : list.get()){
                AgendamentoDTO agendamentoDTO = new AgendamentoDTO();
                if(a.getDataRealizada() != null){
                    format = DF.format(a.getDataRealizada());
                    agendamentoDTO.setDataRealizada(format);
                }
                agendamentoDTO.setCriacao(DF.format(a.getCriacao()));
                agendamentoDTO.setDataAgendadaStr(DF.format(a.getDataAgendada()));
                agendamentoDTO.setDataAgendada(a.getDataAgendada());
                agendamentoDTO.setCliente(a.getCliente());
                agendamentoDTO.setDiarista(a.getDiarista());
                agendamentoDTO.setId(a.getId());
                agendamentoDTO.setComentario(a.getComentario());
                agendamentoDTO.setEstrelas(a.getEstrelas());
                dtoList.add(agendamentoDTO);
            }

        }
        return dtoList;
    }

    public AgendamentoDTO criarAgendamento(AgendamentoDTO agendamentoDTO){

            Date date = new Date();
            Agendamento agendamento = new Agendamento();

            agendamento.setDiarista(agendamentoDTO.getDiarista());
            agendamento.setCliente(agendamentoDTO.getCliente());
            agendamento.setDataAgendada(agendamentoDTO.getDataAgendada());
            agendamento.setCriacao(date);

            agendamento.setCriacao(date);
            agendamentoRepository.save(agendamento);


            return agendamentoDTO;

    }

    public AgendamentoDTO editarAgendamento(AgendamentoDTO agendamentoDTO, Long id){

        Agendamento agendamento = agendamentoRepository.findById(id).get();

        agendamento.setDataAgendada(agendamentoDTO.getDataAgendada());

        agendamentoRepository.save(agendamento);


        return agendamentoDTO;

    }

    public AgendamentoDTO salvarAvaliacao(Long idDiarista, AgendamentoDTO agendamentoDTO){

        Agendamento agendamento = agendamentoRepository.findById(agendamentoDTO.getId()).get();
        Diarista diarista = diaristaRepository.findById(idDiarista).get();

        agendamento.setComentario(agendamentoDTO.getComentario());
        agendamento.setEstrelas(agendamentoDTO.getEstrelas());

        if(diarista.getEstrelas() != null){
            diarista.setEstrelas(diarista.getEstrelas() + agendamentoDTO.getEstrelas());
            diarista.setNumAvaliacoes(diarista.getNumAvaliacoes() + 1);

        }else {
            diarista.setEstrelas(agendamentoDTO.getEstrelas());
            diarista.setNumAvaliacoes(1);
        }

        diarista.setAvaliacao((double) (diarista.getEstrelas()/diarista.getNumAvaliacoes()));

        diaristaRepository.save(diarista);
        agendamentoRepository.save(agendamento);

        return agendamentoDTO;
    }

//    public static void main(String[] args) throws ParseException {
//        Date data = DF.parse("2022-11-23T16:10");
//        System.out.println(data);
//    }


}
