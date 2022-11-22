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

  endpoint = 'login';
  api = environment.api;

  public username: string | undefined = '';
  public password: string | undefined= '';
  public authorizationData = '';
  public httpOptions = {
    headers: new HttpHeaders()
  };

  setData(login: Partial<Login>, isDia: string){
    this.localStorage.set('id', String(login.id));
    this.localStorage.set('isDiarista', isDia);
    this.localStorage.set('username', String(login.username));
    this.localStorage.set('password', String(login.password));

    this.username = this.localStorage.get('username');
    this.password = this.localStorage.get('password');

  }

  getOptions(){
    this.authorizationData = 'Basic ' + btoa(this.localStorage.get('username') + ':' + this.localStorage.get('password'));
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
    return this.http.post<Login>(`${this.api}/${this.endpoint}/`, login);
  }

  logOut(){
    this.localStorage.clear();
  }

  isAuthenticated(){
    let userPresent = this.localStorage.get('username');
    return userPresent ? true: false;
  }

}
