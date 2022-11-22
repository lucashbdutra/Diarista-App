import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login/login.component';
import { CadastroLoginComponent } from './pages/login/cadastro-login/cadastro-login.component';
import { CadastrarUsuarioComponent } from './pages/login/cadastrar-usuario/cadastrar-usuario.component';
import { CadastroDiaristaComponent } from './pages/login/cadastro-diarista/cadastro-diarista.component';
import { AgendamentoComponent } from './pages/agendamentos/agendamento/agendamento.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { CadastroAgendamentoComponent } from './pages/agendamentos/cadastro-agendamento/cadastro-agendamento.component';
import { FeedbacksComponent } from './pages/feedback/feedbacks/feedbacks.component';
import { FeedbackModalComponent } from './components/feedback-modal/feedback-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    CadastroLoginComponent,
    CadastrarUsuarioComponent,
    CadastroDiaristaComponent,
    AgendamentoComponent,
    ConfirmModalComponent,
    CadastroAgendamentoComponent,
    FeedbacksComponent,
    FeedbackModalComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    NgxPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
