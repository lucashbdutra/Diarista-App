import { LocalStorageService } from './local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
    ) { }

  endpoint = 'auth';
  api = environment.api;

  public authorizationData = '';
  public httpOptions = {
    headers: new HttpHeaders()
  };

  setData(login: Partial<Login>, isDia: string){
    console.log(login);
    this.localStorage.set('token', String(login.token));
    this.localStorage.set('id', String(login.id));
    this.localStorage.set('isDiarista', isDia);
    this.localStorage.set('username', String(login.username))
    this.localStorage.set('idUser', String(login.idUser));
  }

  getOptions(){
    this.authorizationData = 'Bearer ' + this.localStorage.get('token');
    return this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authorizationData
      })
    };
  }

  authenticate(login: Partial<Login>){
    return this.http.post<Login>(`${this.api}/${this.endpoint}/authenticate/`, login);
  }

  cadastro(login: Partial<Login>){
    return this.http.post<Login>(`${this.api}/${this.endpoint}/register/`, login);
  }

  hasCadastro(username: string){
    return this.http.get<boolean>(`${this.api}/${this.endpoint}/hasCadastro/${username}`);
  }

  relacionarCliente(cpfCliente: string){
    let username: string = this.localStorage.get('username');
    return this.http.put<Login>(`${this.api}/${this.endpoint}/relacionarCliente?`
    +`cpfCliente=${cpfCliente}&username=${username}`, this.getOptions());
  }

  relacionarDiarista(cpfDiarista: string,){
    let username: string = this.localStorage.get('username');
    return this.http.put<Login>(`${this.api}/${this.endpoint}/relacionarDiarista?`
    +`cpfDiarista=${cpfDiarista}&username=${username}`, this.getOptions());
  }

  logOut(){
    this.localStorage.clear();
  }

  isAuthenticated(){
    let isTokenPresent = this.localStorage.get('token');
    return isTokenPresent ? true: false;
  }

  isCadastrado(){
    let isUsernamePresent = this.localStorage.get('username');
    return isUsernamePresent ? true : false;
  }

}
