import { FeedbackModalComponent } from './../../../components/feedback-modal/feedback-modal.component';
import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Agendamento } from 'src/app/interfaces/agendamento';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { DiaristaService } from 'src/app/services/diarista.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent {

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


  finalizar(id: number){
    this.agendamentoService.visitaRealizada(id).subscribe();
    window.location.href = `http://localhost:4200/agendamentos`;
  }

  search(event: Event){
    const target = event.target as HTMLInputElement
    const value = target.value
    this.agendamentos = this.backup.filter((agendamento) => {
      return agendamento.diarista.nome.toLowerCase().includes(value);
    })
  }

  openModalComponent(idAgendamento: number, diarista: string, idDiarista: number) {
    const initialStateDeletar = {
      idAgendamento,
      diarista,
      idDiarista
    };


    this.modalRef = this.bsModalService.show(FeedbackModalComponent, {
      initialState: initialStateDeletar,
      class: 'my-modal',
    });

  }
  openModal(idAvaliacao: number) {
    const initialStateDeletar = {
      idAvaliacao,

    };


    this.modalRef = this.bsModalService.show(FeedbackModalComponent, {
      initialState: initialStateDeletar,
      class: 'my-modal',
    });

  }


}
