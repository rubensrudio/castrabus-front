import { Component, signal, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PessoaService } from '../../services/pessoa.service';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
  action: any;
  children?: MenuItem[];
  isExpanded?: boolean;
};

@Component({
  selector: 'app-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrl: './menu-sidenav.component.scss',
})
export class MenuSidenavComponent implements OnInit {
  user: any;
  pessoa: any;
  nomeUsuario: any = "";
  sideNavCollapsed = signal(false);

  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  constructor(public auth: AuthService, public pessoaService: PessoaService) {}

  ngOnInit() {
    this.auth.getUser().subscribe(user => {
      this.user = user;
    });

    this.pessoaService.getPessoa(this.user.id).subscribe(pessoa => {
      this.pessoa = pessoa;
    });

    if (this.pessoa) {
      this.nomeUsuario = this.pessoa.nomeCompleto;
    }
  }

  menuItems = signal<MenuItem[]>([
    { icon: 'person', label: 'Tutor', route: 'tutor', action: () => { this.closeMenu(); }, isExpanded: false },
    { icon: 'pets', label: 'Animais', route: 'animais', action: () => { this.closeMenu(); }, isExpanded: false },
    { icon: 'healing', label: 'Doenças', route: 'doenca', action: () => { this.closeMenu(); }, isExpanded: false },
    { icon: 'vaccines', label: 'Vacinas', route: 'vacina', action: () => { this.closeMenu(); }, isExpanded: false },
    { icon: 'calendar_month', label: 'Agendamento', route: 'agendamentos', action: () => { this.closeMenu(); }, isExpanded: false },
    {
      icon: 'event',
      label: 'Atendimentos',
      route: '',
      action: null,
      isExpanded: false,
      children: [
        { icon: 'dashboard', label: 'Painel de Atendimentos', route: 'atendimentos/fila', action: () => this.closeMenu(), isExpanded: false },
        { icon: 'list', label: 'Lista de Atendimentos', route: 'atendimentos', action: () => this.closeMenu(), isExpanded: false },
        { icon: 'assignment', label: 'Pré-Operatório', route: 'atendimentos/pre-operatorio', action: () => this.closeMenu(), isExpanded: false },
        { icon: 'assignment', label: 'Trans-Operatório', route: 'atendimentos/trans-operatorio', action: () => this.closeMenu(), isExpanded: false },
        { icon: 'assignment', label: 'Pós-Operatório', route: 'atendimentos/pos-operatorio', action: () => this.closeMenu(), isExpanded: false }
      ]
    },
    {
      icon: 'settings',
      label: 'Configurações',
      route: '',
      action: null,
      isExpanded: false,
      children: [
        /*{ icon: 'store', label: 'Empresa', route: 'empresas', action: () => { this.closeMenu(); }, isExpanded: false },*/
        { icon: 'business', label: 'Contratante', route: 'contratante', action: () => this.closeMenu(), isExpanded: false },
        { icon: 'campaign', label: 'Campanhas', route: 'campanhas', action: () => this.closeMenu(), isExpanded: false },
        { icon: 'medical_services', label: 'Medicamentos', route: 'medicamento', action: () => this.closeMenu(), isExpanded: false },
        { icon: 'people', label: 'Perfis', route: 'perfis', action: () => this.closeMenu(), isExpanded: false },
        { icon: 'local_hospital', label: 'Veterinário', route: 'veterinario', action: () => this.closeMenu(), isExpanded: false }
        /*{ icon: 'person', label: 'Usuários', route: 'usuarios', action: () => this.closeMenu(), isExpanded: false }*/
      ]
    },
    { icon: 'logout', label: 'Sair', route: 'home', action: () => { this.logout(); }, isExpanded: false }
  ]);

  profilePicSize() {
    return this.sideNavCollapsed() ? '32' : '100';
  }

  logout() {
    this.auth.signOut();
  }

  handleClick(menuItem: any) {
    menuItem.action();
  }

  toggleDropdown(menuItem: MenuItem) {
    menuItem.isExpanded = !menuItem.isExpanded;
  }

  closeMenu() {
    //this.sideNavCollapsed.set(true);
  }
}
