import { DiaristaService } from './../../../services/diarista.service';

import { AgendamentoService } from './../../../services/agendamento.service';
import { LocalStorageService } from './../../../services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { Agendamento } from 'src/app/interfaces/agendamento';
import { ICliente } from 'src/app/interfaces/cliente';
import { Diarista } from 'src/app/interfaces/diarista';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit {

  p = 0;
  agendamentos: Agendamento[] = [];
  backup: Agendamento[] = [];
  isDiarista: Boolean = true;

  constructor(
    private localStorage: LocalStorageService,
    private agendamentoService: AgendamentoService,
    private clienteService: ClientesService,
    private diaristaService: DiaristaService,
    private bsModalService: BsModalService,
    private modalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    const isDiarista = this.localStorage.get('isDiarista');
    if(isDiarista === 'false'){
      this.isDiarista = false;
    }
    this.listar();
  }

  listar(){
    const id = Number(this.localStorage.get('id'));
    if(this.isDiarista){
      this.agendamentoService.listarPorDiaristaId(id).subscribe((agendamentos: Agendamento[]) => {
        this.agendamentos = agendamentos;
        this.backup = agendamentos;
      })
    } else{
      this.agendamentoService.listarPorClienteId(id).subscribe((agendamentos: Agendamento[]) => {
        this.agendamentos = agendamentos;
        this.backup = agendamentos;
      })
    }

  }


  openModalComponent(idAgendamento: number) {
    const initialStateDeletar = {
      idAgendamento
    };


    this.modalRef = this.bsModalService.show(ConfirmModalComponent, {
      initialState: initialStateDeletar,
      class: 'my-modal',
    });

  }

  finalizar(id: number){
    this.agendamentoService.visitaRealizada(id).subscribe();
    window.location.href = `http://localhost:4200/agendamentos`;
  }

  search(event: Event){
    const target = event.target as HTMLInputElement
    const value = target.value
    this.agendamentos = this.backup.filter((agendamento) => {
      return agendamento.criacao.toLowerCase().includes(value);
    })
  }

}
