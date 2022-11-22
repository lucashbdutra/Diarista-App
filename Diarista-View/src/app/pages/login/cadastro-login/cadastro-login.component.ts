import { DiaristaService } from './../../../services/diarista.service';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ALERT_MESSAGE } from 'src/app/enums/alert-message';
import { Login } from 'src/app/interfaces/login';
import { LoginService } from 'src/app/services/login.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ThisReceiver } from '@angular/compiler';
import { Diarista } from 'src/app/interfaces/diarista';
import { ICliente } from 'src/app/interfaces/cliente';

@Component({
  selector: 'app-cadastro-login',
  templateUrl: './cadastro-login.component.html',
  styleUrls: ['./cadastro-login.component.css']
})
export class CadastroLoginComponent implements OnInit {

  idDiarista = 0;
  idCliente = 0;
  isDiarista = '';

  diarista?: Diarista;
  cliente?: ICliente;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private loginService: LoginService,
    private diaristaService: DiaristaService,
    private clienteService: ClientesService,
    private toaster: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isDiarista = String(this.route.snapshot.paramMap.get('isDia'));
    if(this.isDiarista === 'yes'){

      this.idDiarista = Number(this.route.snapshot.paramMap.get('id'));
      this.diaristaService.buscarDiaristaPorId(this.idDiarista).subscribe((diarista: Diarista) => {
        this.diarista = diarista;
      })

    } else{

      this.idCliente = Number(this.route.snapshot.paramMap.get('id'));
      this.clienteService.buscarClientePorId(this.idCliente).subscribe((cliente: ICliente) => {
        this.cliente = cliente;
      })
    }
  }

  form = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmarSenha: ['', Validators.required]
  })

  onCadastro(){

    const senha = this.form.value.password;
    const confirmar = this.form.value.confirmarSenha;
    if(senha == confirmar){

      const login: Login = {
        username: String(this.form.value.username),
        password: String(senha),
        isDiarista: this.isDiarista === 'yes'? true: false
      };

      if(login.isDiarista){
        login.diarista = this.diarista;
      } else{
        login.cliente = this.cliente;
      }

      if(this.form.valid){

          this.loginService.cadastro(login).subscribe((login: Login) => {
            if(login){
              this.form.reset();
              this.toaster.success('Cadastro realizado com sucesso!', '', {
                timeOut: 2000,
              });
              this.router.navigate(['/login']);
            }
          }, (error) => {
            this.toaster.error('Nome de usuário ja está em uso!', '', {
              timeOut: 2000,
            });
          });
        } else{

          this.toaster.warning('Preencha todos os campos', '', {
            timeOut: 2000,
          });
        }
    }else{
      this.toaster.warning('As senhas devem ser iguais', '', {
        timeOut: 2000,
      });
    }

  }


  onLogin(){
    this.router.navigate(['/login']);
  }

}
