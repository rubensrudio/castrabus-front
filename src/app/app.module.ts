import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginator } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCommonModule } from '@angular/material/core';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { ToastrModule } from 'ngx-toastr';

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { AuthInterceptor } from './core/auth.interceptor';

import { HomePage } from './home/home-page';
import { LoginComponent } from './components/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MenuSidenavComponent } from './components/menu-sidenav/menu-sidenav.component';
import { AgendamentoFormComponent } from './components/agendamento/agendamento-form/agendamento-form.component';
import { AgendamentoListComponent } from './components/agendamento/agendamento-list/agendamento-list.component';
import { AnimalFormComponent } from './components/animal/animal-form/animal-form.component';
import { AnimalListComponent } from './components/animal/animal-list/animal-list.component';
import { CampanhaFormComponent } from './components/campanha/campanha-form/campanha-form.component';
import { CampanhaListComponent } from './components/campanha/campanha-list/campanha-list.component';
import { EmpresaFormComponent } from './components/empresa/empresa-form/empresa-form.component';
import { EmpresaListComponent } from './components/empresa/empresa-list/empresa-list.component';
import { PerfilFormComponent } from './components/perfil/perfil-form/perfil-form.component';
import { PerfilListComponent } from './components/perfil/perfil-list/perfil-list.component';
import { PessoaFormComponent } from './components/pessoa/pessoa-form/pessoa-form.component';
import { PessoaListComponent } from './components/pessoa/pessoa-list/pessoa-list.component';
import { UsuarioFormComponent } from './components/usuario/usuario-form/usuario-form.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { TutorListComponent } from './components/tutor/tutor-list/tutor-list.component';
import { TutorFormComponent } from './components/tutor/tutor-form/tutor-form.component';
import { VeterinarioListComponent } from './components/veterinario/veterinario-list/veterinario-list.component';
import { VeterinarioFormComponent } from './components/veterinario/veterinario-form/veterinario-form.component';
import { ContratanteListComponent } from './components/contratante/contratante-list/contratante-list.component';
import { ContratanteFormComponent } from './components/contratante/contratante-form/contratante-form.component';
import { VacinaListComponent } from './components/vacina/vacina-list/vacina-list.component';
import { VacinaFormComponent } from './components/vacina/vacina-form/vacina-form.component';
import { DoencaListComponent } from './components/doenca/doenca-list/doenca-list.component';
import { DoencaFormComponent } from './components/doenca/doenca-form/doenca-form.component';
import { AtendimentoListComponent } from './components/atendimento/atendimento-list/atendimento-list.component';
import { AtendimentoFormComponent } from './components/atendimento/atendimento-form/atendimento-form.component';
import { MedicamentoFormComponent } from './components/medicamento/medicamento-form/medicamento-form.component';
import { MedicamentoListComponent } from './components/medicamento/medicamento-list/medicamento-list.component';
import { AtendimentoFilaComponent } from './components/atendimento/atendimento-fila/atendimento-fila.component';
import { AtendimentoPosComponent } from './components/atendimento/atendimento-pos/atendimento-pos.component';
import { AtendimentoTransComponent } from './components/atendimento/atendimento-trans/atendimento-trans.component';
import { DialogRecomendacaoComponent } from './shared/components/dialog-recomendacao/dialog-recomendacao.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    LoginComponent,
    MenuSidenavComponent,
    AgendamentoFormComponent,
    AgendamentoListComponent,
    AtendimentoListComponent,
    AtendimentoFormComponent,
    AtendimentoFilaComponent,
    AnimalFormComponent,
    AnimalListComponent,
    CampanhaFormComponent,
    CampanhaListComponent,
    ContratanteListComponent,
    ContratanteFormComponent,
    DoencaListComponent,
    DoencaFormComponent,
    EmpresaFormComponent,
    EmpresaListComponent,
    PerfilFormComponent,
    PerfilListComponent,
    PessoaFormComponent,
    PessoaListComponent,
    UsuarioFormComponent,
    UsuarioListComponent,
    TutorListComponent,
    TutorFormComponent,
    VacinaListComponent,
    VacinaFormComponent,
    VeterinarioListComponent,
    VeterinarioFormComponent,
    MedicamentoFormComponent,
    MedicamentoListComponent,
    AtendimentoPosComponent,
    AtendimentoTransComponent,
    DialogRecomendacaoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatPaginator,
    MatSelect,
    MatOption,
    MatCheckboxModule,
    MatNativeDateModule,
    MatIconModule,
    MatDatepickerModule,
    MatCardModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatRadioModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatCommonModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatTabsModule,
    SocialLoginModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        lang: 'en',
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '462196977457-v5nq42rfmrr5doq699imvqskju5r5v4t.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('510896674797172')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    provideAnimationsAsync()
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
