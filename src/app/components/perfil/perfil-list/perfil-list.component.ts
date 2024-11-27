import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Perfil } from '../../../models/perfil.model';
import { PerfilService } from '../../../services/perfil.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
  styleUrl: './perfil-list.component.scss'
})
export class PerfilListComponent implements OnInit {

  @Input() codPage: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  perfis: Perfil[] = [];
  displayedColumns: string[] = ['id', 'nome', 'actions'];
  httpModel: any;
  dataSource: any;

  constructor(private perfilService: PerfilService
            , private router: Router
            , private mensagem: ToastrService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.codPage == 8) {
        this.loadPerfis();
      }
    });
  }

  ngOnInit(): void {
    this.loadPerfis();
  }

  loadPerfis(): void {
    this.perfilService.getPerfis().subscribe(data => {
      this.httpModel = data;
      this.perfis = this.httpModel.result;
      this.dataSource = new MatTableDataSource<Perfil>(this.perfis);
      this.dataSource.paginator = this.paginator;
    });
  }

  deletePerfil(id: number): void {
    this.perfilService.deletePerfil(id).subscribe({
      next: () => {
        this.mensagem.success('Excluído com Sucesso!', 'Sucesso');
        this.perfis = this.perfis.filter(u => u.id !== id);
        this.loadPerfis();
      },
      error: () => {
        this.mensagem.error('Erro ao salvar!', 'Erro');
      }
    });
  }
}
