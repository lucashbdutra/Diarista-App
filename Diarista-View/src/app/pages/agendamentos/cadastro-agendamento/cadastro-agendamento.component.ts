import { LocalStorageService } from './../../../services/local-storage.service';
import { ClientesService } from './../../../services/clientes.service';
import { DiaristaService } from './../../../services/diarista.service';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AgendamentoService } from './../../../services/agendamento.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Diarista } from 'src/app/interfaces/diarista';
import { ICliente } from 'src/app/interfaces/cliente';
import { Agendamento } from 'src/app/interfaces/agendamento';

@Component({
  selector: 'app-cadastro-agendamento',
  templateUrl: './cadastro-agendamento.component.html',
  styleUrls: ['./cadastro-agendamento.component.css']
})
export class CadastroAgendamentoComponent {

  isShow: boolean = true;
  idAgendamento = 0;
  cliente?: ICliente;

  diarista?: Diarista;
  diaristas: Diarista[] = [];
  backup: Diarista[] = [];

  constructor(
    private agendamentoService: AgendamentoService,
    private diaristaService: DiaristaService,
    private clienteService: ClientesService,
    private localStorage: LocalStorageService,
    private formBuilder: NonNullableFormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.idAgendamento = Number(this.route.snapshot.paramMap.get('id'));
    if(this.idAgendamento){
      this.agendamentoService.buscarAgendamentoPorId(this.idAgendamento).subscribe((agendamento: Agendamento) => {
        this.cliente = agendamento.cliente;
        this.diarista = agendamento.diarista;
      })
    } else{
      this.listar();
    }
  }

  listar(){
    const id = Number(this.localStorage.get('id'));

    this.diaristaService.listarTodosdiaristas().subscribe((diaristas: Diarista[]) => {
      this.diaristas = diaristas;
      this.backup = diaristas;
    })

    this.clienteService.buscarClientePorId(id).subscribe((cliente: ICliente) => {
      this.cliente = cliente;
    })
  }

  agendamento = this.formBuilder.group({
    dataAgendada: ['', Validators.required]

  })

  cadastrar(){
    // console.log(this.agendamento.value)
    const cliente = this.cliente as ICliente;
    const diarista = this.diarista as Diarista;
    let agendamento = this.agendamento.value as Agendamento;
    agendamento.cliente = cliente;
    agendamento.diarista = diarista;

    if(this.idAgendamento){
      const id = this.idAgendamento;
      agendamento.id = id;
      this.agendamentoService.atualizarAgendamento(agendamento).subscribe(() => {
        this.router.navigate(['/agendamentos']);
      })
    } else{

      this.agendamentoService.adcionarAgendamento(agendamento).subscribe(() => {
        this.router.navigate(['/agendamentos']);
      })
    }

  }

  handleDiarista(diarista: Diarista){
    const diaris = diarista as Diarista;
    this.diarista = diaris;
  }

  hide(){
    if(!this.diarista){

    } else{
      this.isShow = !this.isShow;
    }

  }

  search(event: Event){
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();
    this.diaristas = this.backup.filter((diarista) => {
      return diarista.endereco.toLowerCase().includes(value);
    })
  }

}
