import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AgendamentoService } from '../../../services/agendamento.service';
import { Agendamento } from '../../../models/agendamento.model';
import { ToastrService } from 'ngx-toastr';
import { CampanhaService } from '../../../services/campanha.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-atendimento-list',
  templateUrl: './atendimento-list.component.html',
  styleUrls: ['./atendimento-list.component.scss']
})
export class AtendimentoListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'campanha', 'data', 'hora', 'tutor', 'especie', 'genero', 'nomeAnimal', 'senha', 'actions'];
  dataSource: MatTableDataSource<Agendamento>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filtros = { campanhaId: null, data: null, tutor: '' };
  campanhas: any[] = [];
  httpModel: any;
  dataCampanha!: Date | null;
  agendamentos: Agendamento[] = [];

  constructor(
    private agendamentoService: AgendamentoService,
    private campanhaService: CampanhaService,
    private toastr: ToastrService
  ) {
    this.dataSource = new MatTableDataSource<Agendamento>([]);
  }

  ngOnInit(): void {
    this.campanhaService.getCampanhasValidas().subscribe((data) => {
      this.httpModel = data;
      this.campanhas = this.httpModel.result;
  });
    this.buscarAgendamentos();
  }

  buscarAgendamentos(): void {
    this.dataCampanha = this.filtros.data;
    const atendimentoFiltro = {
      campanhaId: this.filtros.campanhaId,
      data: this.convertDataBR(this.dataCampanha),
      tutor: this.filtros.tutor
    };
    this.agendamentoService.getAgendamentosFiltered(atendimentoFiltro).subscribe({
      next: (data) => {
        this.httpModel = data;
        this.agendamentos = this.httpModel.result;
        this.dataSource = new MatTableDataSource<Agendamento>(this.agendamentos);
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.toastr.error('Erro ao carregar agendamentos.', 'Erro');
      }
    });
  }

  private convertDataBR(date: Date | null): string | null {
    if (date === null) return null;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
     const year = date.getFullYear();
     return `${day}/${month}/${year}`;
  }

  gerarSenha(agendamentoId: number): void {
    this.agendamentoService.gerarSenha(agendamentoId).subscribe({
      next: () => {
        this.buscarAgendamentos();  // Atualiza a listagem com a nova senha
        this.toastr.success('Senha gerada com sucesso!', 'Sucesso');
      },
      error: () => {
        this.toastr.error('Erro ao gerar senha.', 'Erro');
      }
    });
  }
}
