import { ClientesService } from './../../../services/clientes.service';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ICliente } from 'src/app/interfaces/cliente';
import { Validacoes } from 'src/app/components/utils/validacoes';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {

  idCliente = 0;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private clienteService: ClientesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idCliente = Number(this.route.snapshot.paramMap.get('id'));
    this.clienteService.buscarClientePorId(this.idCliente).subscribe((cliente: ICliente) => {
      this.formCliente.setValue({
        nome: cliente.nome,
        cpf: cliente.cpf,
        contato: cliente.contato,
        email: cliente.email,
        endereco: cliente.endereco
      })
    })
  }

  formCliente = this.formBuilder.group({
    nome:[
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
    ],
    cpf:[
      '',
      Validators.compose([
        Validators.required,
        Validacoes.ValidaCpf
      ])
    ],
    contato: ['', Validators.required],
    email: ['',
    Validators.compose([
      Validators.required,
      Validators.email
    ])
  ],
    endereco: ['', Validators.required]
  })


  onCadastro(){
    const cliente = this.formCliente.value as ICliente;
    const idCliente = this.idCliente;
    if(idCliente != 0){

      cliente.id = idCliente;
      this.clienteService.atualizarCliente(cliente).subscribe((cliente: any) => {
        if(cliente){
          this.router.navigate(['/home']);
        }
      })

    } else{

      this.clienteService.adcionarCliente(cliente).subscribe((cliente: ICliente) => {
        if(cliente){
          this.router.navigate([`/login/cadastro/no/${cliente.id}`])
        }
      });

    }


  }

}
