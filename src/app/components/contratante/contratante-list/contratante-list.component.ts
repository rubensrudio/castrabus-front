import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { filter } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ContratanteService } from '../../../services/contratante.service';
import { Contratante } from '../../../models/contratante.model';

@Component({
  selector: 'app-contratante-list',
  templateUrl: './contratante-list.component.html',
  styleUrl: './contratante-list.component.scss'
})
export class ContratanteListComponent implements OnInit {

  @Input() codPage: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  contratantes: Contratante[] = [];
  displayedColumns: string[] = ['id', 'nome', 'cnpj', 'telefone', 'cidade', 'estado', 'actions'];
  httpModel: any;
  dataSource: any;

  constructor(private contratanteService: ContratanteService, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.codPage == 4) {
        this.loadContratantes();
      }
    });
  }

  ngOnInit(): void {
    this.loadContratantes();
  }

  loadContratantes(): void {
    this.contratanteService.getContratantes().subscribe(data => {
      this.httpModel = data;
      this.contratantes = this.httpModel.result;
      this.dataSource = new MatTableDataSource<Contratante>(this.contratantes);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteContratante(id: number): void {
    this.contratanteService.deleteContratante(id).subscribe(() => {
      this.contratantes = this.contratantes.filter(u => u.id !== id);
      this.loadContratantes();
    });
  }
}
