import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { VacinaService } from '../../../services/vacina.service';
import { Vacina } from '../../../models/vacina.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vacina-list',
  templateUrl: './vacina-list.component.html',
  styleUrls: ['./vacina-list.component.scss']
})
export class VacinaListComponent implements OnInit {
  displayedColumns: string[] = ['tutorNome', 'animalNome', 'dataVacinacao', 'dataProximaVacinacao', 'actions'];
  dataSource: MatTableDataSource<Vacina>;
  vacinas: Vacina[] = [];
  httpModel: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private vacinaService: VacinaService, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource<Vacina>(this.vacinas);
  }

  ngOnInit(): void {
    this.loadVacinas();
  }

  loadVacinas(): void {
    this.vacinaService.getVacinas().subscribe({
      next: (data) => {
        this.httpModel = data;
        this.vacinas = this.httpModel.result;

        this.vacinas.forEach(el => {
          el.dataVacinacao = this.toISOFormat(el.dataVacinacao);
          el.dataProximaVacinacao = this.toISOFormat(el.dataProximaVacinacao);
        });

        this.dataSource.data = this.vacinas;
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.toastr.error('Erro ao carregar vacinas.', 'Erro');
      }
    });
  }

  deleteVacina(id: number): void {
    this.vacinaService.deleteVacina(id).subscribe({
      next: () => {
        this.vacinas = this.vacinas.filter(v => v.id !== id);
        this.dataSource.data = this.vacinas;
        this.toastr.success('Vacina excluída com sucesso!', 'Sucesso');
      },
      error: () => {
        this.toastr.error('Erro ao excluir vacina.', 'Erro');
      }
    });
  }

  toISOFormat(date: any) {
    return date;
  }
}
