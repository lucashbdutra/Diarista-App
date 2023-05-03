import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username = '';
  isDiarista = '';

  constructor(
    private loginService: LoginService,
    private localStorage: LocalStorageService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.username = this.localStorage.get('username');
    this.isDiarista = this.localStorage.get('isDiarista');
    console.log(this.isDiarista);
    this.hasCadastro();
  }

  hasCadastro(){
    this.loginService.hasCadastro(this.username).subscribe((cadastrado : boolean) => {
      if(!cadastrado){
        if(this.isDiarista === 'true'){
          this.router.navigate(['login/cadastro/diarista']);
        }
        if(this.isDiarista === 'false'){
          this.router.navigate(['login/cadastro/usuario']);
        }

      }
    })
  }

}
