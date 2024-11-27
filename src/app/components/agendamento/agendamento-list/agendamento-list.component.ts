import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Agendamento } from '../../../models/agendamento.model';
import { MatPaginator } from '@angular/material/paginator';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { AgendamentoService } from '../../../services/agendamento.service';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agendamento-list',
  templateUrl: './agendamento-list.component.html',
  styleUrl: './agendamento-list.component.scss',
})
export class AgendamentoListComponent  implements OnInit {

  @Input() codPage: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  agendamentos: Agendamento[] = [];
  displayedColumns: string[] = ['id', 'campanhaId', 'data', 'hora', 'pessoaId', 'animalId', 'actions'];
  httpModel: any;
  dataSource: any;
  user: any;

  constructor(
    private agendamentoService: AgendamentoService,
    private router: Router,
    private auth: AuthService,
    private mensagem: ToastrService) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      if (this.codPage == 1) {
        this.loadAgendamento();
      }
    });
  }

  ngOnInit(): void {
    this.auth.getUser().subscribe(user => {
      this.user = user;
    });
    this.loadAgendamento();
  }

  deleteEmpresa(id: number): void {
    this.agendamentoService.deleteAgendamento(id).subscribe({
      next: () => {
        this.mensagem.success('Agendamento Realizado com Sucesso!', 'Sucesso');
        this.agendamentos = this.agendamentos.filter(u => u.id !== id);
        this.loadAgendamento();
      },
      error: () => {
        this.mensagem.error('Erro ao realizar agendamento!', 'Erro');
      }
    });
  }

  loadAgendamento() {
    if (this.user?.role === 'ADM') {
      this.agendamentoService.getAllAgendamentos().subscribe((data) => {
        this.httpModel = data;
        this.agendamentos = this.httpModel.result;
        this.dataSource = new MatTableDataSource<Agendamento>(this.agendamentos);
        this.dataSource.paginator = this.paginator;
      });
    } else {
      let userId = 0;

      if(this.user?.id) {
        userId = this.user.id;
      }

      this.agendamentoService.getAllMyAgendamentos(userId).subscribe((data) => {
        this.httpModel = data;
        this.agendamentos = this.httpModel.result;
        this.dataSource = new MatTableDataSource<Agendamento>(this.agendamentos);
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  podeExcluir(data: string, hora: string): boolean {
    const [dia, mes, ano] = data.split('/').map(Number);
    const [horas, minutos] = hora.split(':').map(Number);

    const dataRecebida = new Date(ano, mes - 1, dia, horas, minutos);

    const dataAtual = new Date();

    return dataRecebida > dataAtual;
  }
}
