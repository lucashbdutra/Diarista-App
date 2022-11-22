import { LocalStorageService } from './../../../services/local-storage.service';
import { DiaristaService } from './../../../services/diarista.service';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Validacoes } from 'src/app/components/utils/validacoes';
import { Diarista } from 'src/app/interfaces/diarista';

@Component({
  selector: 'app-cadastro-diarista',
  templateUrl: './cadastro-diarista.component.html',
  styleUrls: ['./cadastro-diarista.component.css']
})
export class CadastroDiaristaComponent implements OnInit {

  idDiarista = 0;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private diaristaService: DiaristaService,
    private localStorage: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idDiarista = Number(this.route.snapshot.paramMap.get('id'));
    this.diaristaService.buscarDiaristaPorId(this.idDiarista).subscribe((diarista: Diarista) => {
      this.formDiarista.setValue({
        nome: diarista.nome,
        cpf: diarista.cpf,
        contato: diarista.contato,
        email: diarista.email,
        endereco: diarista.endereco,
        pix: diarista.pix
      })
    })
  }

  formDiarista = this.formBuilder.group({
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
    endereco: ['', Validators.required],
    pix: ['', Validators.required]
  })


  onCadastro(){
    const diarista = this.formDiarista.value as Diarista;
    const idDiarista = this.idDiarista;
    if(idDiarista != 0){

      diarista.id = idDiarista;
      this.diaristaService.atualizarDiarista(diarista).subscribe((diarista: any) => {
        if(diarista){
          this.router.navigate([`/home`])
        }
      });

    } else{

      this.diaristaService.adcionarDiarista(diarista).subscribe((diarista: Diarista) => {
        if(diarista){
          this.router.navigate([`/login/cadastro/yes/${diarista.id}`])
        }
      });
    }


  }

}
