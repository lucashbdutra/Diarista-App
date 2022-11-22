import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Diarista } from '../interfaces/diarista';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class DiaristaService {

  endpoint = 'diaristas';
  api = environment.api;


  constructor(
    private http: HttpClient,
    private loginService: LoginService
    ) { }

  listarTodosdiaristas() {
    return this.http.get<Diarista[]>(`${this.api}/${this.endpoint}/`);
  }

  adcionarDiarista(diarista: Partial<Diarista>){
    return this.http.post<Diarista>(`${this.api}/${this.endpoint}/`, diarista);
  }

  removerDiarista(id: string){
    return this.http.delete<Diarista>(`${this.api}/${this.endpoint}/${id}`, this.loginService.getOptions());
  }

 atualizarDiarista(diarista: Diarista){
  return this.http.put(`${this.api}/${this.endpoint}/${diarista.id}`, diarista, this.loginService.getOptions());
  }

  buscarDiaristaPorId(id: number) {
    return this.http.get<Diarista>(`${this.api}/${this.endpoint}/${id}`);
  }
}
