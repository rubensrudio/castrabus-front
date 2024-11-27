import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home-page';
import { LoginComponent } from './components/login/login.component';
import { UsuarioFormComponent } from './components/usuario/usuario-form/usuario-form.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { EmpresaListComponent } from './components/empresa/empresa-list/empresa-list.component';
import { EmpresaFormComponent } from './components/empresa/empresa-form/empresa-form.component';
import { PerfilListComponent } from './components/perfil/perfil-list/perfil-list.component';
import { PerfilFormComponent } from './components/perfil/perfil-form/perfil-form.component';
import { PessoaListComponent } from './components/pessoa/pessoa-list/pessoa-list.component';
import { PessoaFormComponent } from './components/pessoa/pessoa-form/pessoa-form.component';
import { AnimalListComponent } from './components/animal/animal-list/animal-list.component';
import { AnimalFormComponent } from './components/animal/animal-form/animal-form.component';
import { CampanhaListComponent } from './components/campanha/campanha-list/campanha-list.component';
import { CampanhaFormComponent } from './components/campanha/campanha-form/campanha-form.component';
import { AgendamentoListComponent } from './components/agendamento/agendamento-list/agendamento-list.component';
import { AgendamentoFormComponent } from './components/agendamento/agendamento-form/agendamento-form.component';
import { TutorFormComponent } from './components/tutor/tutor-form/tutor-form.component';
import { TutorListComponent } from './components/tutor/tutor-list/tutor-list.component';
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
import { AtendimentoFilaComponent } from './components/atendimento/atendimento-fila/atendimento-fila.component';
import { MedicamentoListComponent } from './components/medicamento/medicamento-list/medicamento-list.component';
import { MedicamentoFormComponent } from './components/medicamento/medicamento-form/medicamento-form.component';
import { AtendimentoPosComponent } from './components/atendimento/atendimento-pos/atendimento-pos.component';
import { AtendimentoTransComponent } from './components/atendimento/atendimento-trans/atendimento-trans.component';

const routes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'usuarios', component: UsuarioListComponent },
  { path: 'usuarios/create', component: UsuarioFormComponent },
  { path: 'usuarios/view/:id', component: UsuarioFormComponent },
  { path: 'usuarios/edit/:id', component: UsuarioFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'empresas', component: EmpresaListComponent },
  { path: 'empresas/create', component: EmpresaFormComponent },
  { path: 'empresas/view/:id', component: EmpresaFormComponent },
  { path: 'empresas/edit/:id', component: EmpresaFormComponent },
  { path: 'perfis', component: PerfilListComponent },
  { path: 'perfis/create', component: PerfilFormComponent },
  { path: 'perfis/view/:id', component: PerfilFormComponent },
  { path: 'perfis/edit/:id', component: PerfilFormComponent },
  { path: 'pessoas', component: PessoaListComponent },
  { path: 'pessoas/create', component: PessoaFormComponent },
  { path: 'pessoas/view/:id', component: PessoaFormComponent },
  { path: 'pessoas/edit/:id', component: PessoaFormComponent },
  { path: 'animais', component: AnimalListComponent },
  { path: 'animais/create', component: AnimalFormComponent },
  { path: 'animais/view/:id', component: AnimalFormComponent },
  { path: 'animais/edit/:id', component: AnimalFormComponent },
  { path: 'campanhas', component: CampanhaListComponent },
  { path: 'campanhas/create', component: CampanhaFormComponent },
  { path: 'campanhas/view/:id', component: CampanhaFormComponent },
  { path: 'campanhas/edit/:id', component: CampanhaFormComponent },
  { path: 'contratante', component: ContratanteListComponent },
  { path: 'contratante/create', component: ContratanteFormComponent },
  { path: 'contratante/view/:id', component: ContratanteFormComponent },
  { path: 'contratante/edit/:id', component: ContratanteFormComponent },
  { path: 'agendamentos', component: AgendamentoListComponent },
  { path: 'agendamentos/create', component: AgendamentoFormComponent },
  { path: 'agendamentos/view/:id', component: AgendamentoFormComponent },
  { path: 'agendamentos/edit/:id', component: AgendamentoFormComponent },
  { path: 'atendimentos', component: AtendimentoListComponent },
  { path: 'atendimentos/fila', component: AtendimentoFilaComponent },
  { path: 'atendimentos/create', component: AtendimentoFormComponent },
  { path: 'atendimentos/view/:id', component: AtendimentoFormComponent },
  { path: 'atendimentos/edit/:id', component: AtendimentoFormComponent },
  { path: 'atendimentos/pre-operatorio/:id', component: AtendimentoFormComponent },
  { path: 'atendimentos/trans-operatorio/:id', component: AtendimentoTransComponent },
  { path: 'atendimentos/pos-operatorio/:id', component: AtendimentoPosComponent },
  { path: 'atendimentos/pre-operatorio', component: AtendimentoFormComponent },
  { path: 'atendimentos/trans-operatorio', component: AtendimentoTransComponent },
  { path: 'atendimentos/pos-operatorio', component: AtendimentoPosComponent },
  { path: 'tutor', component: TutorListComponent },
  { path: 'tutor/create', component: TutorFormComponent },
  { path: 'tutor/view/:id', component: TutorFormComponent },
  { path: 'tutor/edit/:id', component: TutorFormComponent },
  { path: 'vacina', component: VacinaListComponent },
  { path: 'vacina/create', component: VacinaFormComponent },
  { path: 'vacina/view/:id', component: VacinaFormComponent },
  { path: 'vacina/edit/:id', component: VacinaFormComponent },
  { path: 'veterinario', component: VeterinarioListComponent },
  { path: 'veterinario/create', component: VeterinarioFormComponent },
  { path: 'veterinario/view/:id', component: VeterinarioFormComponent },
  { path: 'veterinario/edit/:id', component: VeterinarioFormComponent },
  { path: 'doenca', component: DoencaListComponent },
  { path: 'doenca/create', component: DoencaFormComponent },
  { path: 'doenca/view/:id', component: DoencaFormComponent },
  { path: 'doenca/edit/:id', component: DoencaFormComponent },
  { path: 'medicamento', component: MedicamentoListComponent },
  { path: 'medicamento/create', component: MedicamentoFormComponent },
  { path: 'medicamento/view/:id', component: MedicamentoFormComponent },
  { path: 'medicamento/edit/:id', component: MedicamentoFormComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
