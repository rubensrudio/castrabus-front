import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AgendamentoService } from '../../../services/agendamento.service';
import { Agendamento } from '../../../models/agendamento.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-atendimento-fila',
  templateUrl: './atendimento-fila.component.html',
  styleUrls: ['./atendimento-fila.component.scss']
})
export class AtendimentoFilaComponent implements OnInit {
  displayedColumns: string[] = ['senha', 'tutor', 'especie', 'nomeAnimal'];
  dataSource: MatTableDataSource<Agendamento>;
  httpModel: any;
  agendamentos: Agendamento[] = [];
  ultimasSenhas: string[] = [];

  constructor(
    private agendamentoService: AgendamentoService,
    private toastr: ToastrService
  ) {
    this.dataSource = new MatTableDataSource<Agendamento>([]);
  }

  ngOnInit(): void {
    this.ultimasSenhas = ['A001', 'A002', 'A003', 'A004', 'A005'];
    this.agendamentoService.getAgendamentosFila().subscribe({
        next: (data) => {
          this.httpModel = data;
          this.agendamentos = this.httpModel.result;
          this.dataSource = new MatTableDataSource<Agendamento>(this.agendamentos);
        },
        error: () => {
          this.toastr.error('Erro ao carregar próximos agendamentos.', 'Erro');
        }
      });
  }
}
