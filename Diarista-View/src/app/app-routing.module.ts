import { CadastroAgendamentoComponent } from './pages/agendamentos/cadastro-agendamento/cadastro-agendamento.component';
import { CadastrarUsuarioComponent } from './pages/login/cadastrar-usuario/cadastrar-usuario.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CadastroLoginComponent } from './pages/login/cadastro-login/cadastro-login.component';
import { LoginComponent } from './pages/login/login/login.component';
import { CadastroDiaristaComponent } from './pages/login/cadastro-diarista/cadastro-diarista.component';
import { AgendamentoComponent } from './pages/agendamentos/agendamento/agendamento.component';
import { FeedbacksComponent } from './pages/feedback/feedbacks/feedbacks.component';



const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'login/cadastro/:isDia/:id', component: CadastroLoginComponent
  },
  {
    path: 'login/cadastro/usuario', component: CadastrarUsuarioComponent
  },
  {
    path: 'login/cadastro/diarista', component: CadastroDiaristaComponent
  },


  {
    path: 'editar/diarista/:id', component: CadastroDiaristaComponent
  },
  {
    path: 'editar/usuario/:id', component: CadastrarUsuarioComponent
  },


  {
    path: 'agendamentos', component: AgendamentoComponent
  },
  {
    path: 'agendamentos/cadastro', component: CadastroAgendamentoComponent
  },
  {
    path: 'agendamentos/editar/:id', component: CadastroAgendamentoComponent
  },


  {
    path: 'feedbacks', component: FeedbacksComponent
  },

  {
    path: 'home', component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
