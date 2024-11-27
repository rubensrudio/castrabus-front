import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { DoencaService } from '../../../services/doenca.service';
import { Doenca } from '../../../models/doenca.model';
import { ToastrService } from 'ngx-toastr';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-doenca-list',
  templateUrl: './doenca-list.component.html',
  styleUrls: ['./doenca-list.component.scss']
})
export class DoencaListComponent implements OnInit {

  displayedColumns: string[] = ['tutorNome', 'animalNome', 'nomeDoenca', 'actions'];
  dataSource: MatTableDataSource<Doenca>;
  doencas: Doenca[] = [];
  httpModel: any;

  @Input() codPage: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private doencaService: DoencaService, private router: Router, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource<Doenca>(this.doencas);
  }

  ngOnInit(): void {
    this.loadDoencas();
  }

  loadDoencas(): void {
    this.doencaService.getDoencas().subscribe({
      next: (data) => {
        this.httpModel = data;
        this.doencas = this.httpModel.result;
        this.dataSource = new MatTableDataSource<Doenca>(this.doencas);
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.toastr.error('Erro ao carregar doenças.', 'Erro');
      }
    });
  }

  deleteDoenca(id: number): void {
    this.doencaService.deleteDoenca(id).subscribe({
      next: () => {
        this.doencas = this.doencas.filter(v => v.id !== id);
        this.dataSource.data = this.doencas;
        this.toastr.success('Doença excluída com sucesso!', 'Sucesso');
      },
      error: () => {
        this.toastr.error('Erro ao excluir doença.', 'Erro');
      }
    });
  }
}
