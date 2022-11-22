import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ALERT_MESSAGE } from 'src/app/enums/alert-message';
import { Login } from 'src/app/interfaces/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private loginService: LoginService,
    private toaster: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    localStorage.removeItem('username');
  }

  ngOnInit(): void {

  }

  form = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })


  onLogin(){
    const login = this.form.value as Login;
    if(this.form.valid){

      this.loginService.authenticate(login).subscribe((login: Login) => {
        if(login){

          if(login.isDiarista){
            this.loginService.setData(login, 'true');
          } else{
            this.loginService.setData(login, 'false');
          }

          this.form.reset();
          this.toaster.success(ALERT_MESSAGE.SUCCESS_SIGNIN, '', {
            timeOut: 1000,
          });
          this.router.navigate(['home']);

        }
      }, (error) => {
        this.toaster.error(ALERT_MESSAGE.ERROR_SIGNIN, '', {
          timeOut: 2000,
        });
      });
    } else{

      this.toaster.warning('Preencha todos os campos', '', {
        timeOut: 2000,
      });
    }
  }

  onAuthenticated(){
    return this.loginService.isAuthenticated();
  }

  onCadastro(){
    this.router.navigate(['cadastro/usuario'], {relativeTo:this.route});
  }

}
