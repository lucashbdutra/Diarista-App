import { AgendamentoService } from './../../services/agendamento.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  idAgendamento = 0;

  constructor(
    private modalRef: BsModalRef,
    private agendamentoService: AgendamentoService

  ) { }

  ngOnInit(): void {
  }

  deletar(){
    this.agendamentoService.removerAgendamento(this.idAgendamento).subscribe();
    this.fecharModal();

  }

  fecharModal() {

    this.modalRef.hide();
    window.location.href = `http://localhost:4200/agendamentos`;
  }

}
