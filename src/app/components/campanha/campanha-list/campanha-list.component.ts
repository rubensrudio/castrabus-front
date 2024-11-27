import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { filter } from 'rxjs';
import { Campanha } from '../../../models/campanha.model';
import { IbgeService } from '../../../services/ibge.service';
import { CampanhaService } from '../../../services/campanha.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-campanha-list',
  templateUrl: './campanha-list.component.html',
  styleUrl: './campanha-list.component.scss'
})
export class CampanhaListComponent implements OnInit {

  @Input() codPage: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  campanhas: Campanha[] = [];
  displayedColumns: string[] = ['id', 'nomecampanha', 'estado', 'cidade', 'bairro', 'dataInicio', 'dataFim', 'actions'];
  httpModel: any;
  dataSource: any;

  constructor(private campanhaService: CampanhaService
            , private router: Router
            , private igbeService: IbgeService
            , private mensagem: ToastrService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.codPage == 3) {
        this.loadCampanhas();
      }
    });
  }

  ngOnInit(): void {
    this.loadCampanhas();
  }

  loadCampanhas() {
    this.campanhaService.getCampanhas().subscribe((data) => {
      this.httpModel = data;
      this.campanhas = this.httpModel.result;

      this.campanhas.forEach(el => {
        el.dataInicio = this.toISOFormat(el.dataInicio);
        el.dataFim = this.toISOFormat(el.dataFim);
      });

      this.dataSource = new MatTableDataSource<Campanha>(this.campanhas);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteCampanha(id: number) {
    this.campanhaService.deleteCampanha(id).subscribe({
      next: () => {
        this.mensagem.success('Excluído com Sucesso!', 'Sucesso');
        this.campanhas = this.campanhas.filter(u => u.id !== id);
        this.loadCampanhas();
      },
      error: () => {
        this.mensagem.error('Erro ao excluir!', 'Erro');
      }
    });
  }

  toISOFormat(date: string) {
    const [DD, MM, YYYY] = date.split('-');
    return `${DD}/${MM}/${YYYY}`;
  }
}
