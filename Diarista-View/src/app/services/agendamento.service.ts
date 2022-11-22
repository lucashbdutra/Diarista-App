import { Agendamento } from 'src/app/interfaces/agendamento';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  endpoint = 'agendamentos';
  api = environment.api;


  constructor(
    private http: HttpClient,
    private loginService: LoginService
    ) { }

  listarPorClienteId(id: number) {
    return this.http.get<Agendamento[]>(`${this.api}/${this.endpoint}/search/cliente/${id}`);
  }

  listarPorDiaristaId(id: number) {
    return this.http.get<Agendamento[]>(`${this.api}/${this.endpoint}/search/diarista/${id}`);
  }

  adcionarAgendamento(agendamento: Partial<Agendamento>){
    return this.http.post<Agendamento>(`${this.api}/${this.endpoint}/create`, agendamento, this.loginService.getOptions());
  }

  removerAgendamento(id: number){
    return this.http.delete<Agendamento>(`${this.api}/${this.endpoint}/${id}`, this.loginService.getOptions());
  }

 atualizarAgendamento(agendamento: Agendamento){
  return this.http.put(`${this.api}/${this.endpoint}/editar/${agendamento.id}`, agendamento, this.loginService.getOptions());
  }

  buscarAgendamentoPorId(id: number) {
    return this.http.get<Agendamento>(`${this.api}/${this.endpoint}/${id}`);
  }

  visitaRealizada(id: number){
    return this.http.get(`${this.api}/${this.endpoint}/visitaRealizada/${id}/`, this.loginService.getOptions());
  }

  avaliarDiarista(idDiarista: number, agendamento: Partial<Agendamento>){
    return this.http.post<Agendamento>(`${this.api}/${this.endpoint}/avaliacao/${idDiarista}`, agendamento, this.loginService.getOptions());
  }
}
