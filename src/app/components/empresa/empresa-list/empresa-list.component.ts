import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Empresa } from '../../../models/empresa.model';
import { EmpresaService } from '../../../services/empresa.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrl: './empresa-list.component.scss'
})
export class EmpresaListComponent implements OnInit {

  @Input() codPage: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  empresas: Empresa[] = [];
  displayedColumns: string[] = ['id', 'nomeFantasia', 'actions'];
  httpModel: any;
  dataSource: any;

  constructor(private empresaService: EmpresaService
            , private router: Router
            , private mensagem: ToastrService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.codPage == 6) {
        this.loadEmpresa();
      }
    });
  }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      if (this.codPage == 6) {
        this.loadEmpresa();
      }
    });
  }

  deleteEmpresa(id: number): void {
    this.empresaService.deleteEmpresa(id).subscribe({
      next: () => {
        this.mensagem.success('Excluído com Sucesso!', 'Sucesso');
        this.empresas = this.empresas.filter(u => u.id !== id);
        this.loadEmpresa();
      },
      error: () => {
        this.mensagem.error('Erro ao salvar!', 'Erro');
      }
    });
  }

  loadEmpresa() {
    this.empresaService.getEmpresas().subscribe((data) => {
      this.httpModel = data;
      this.empresas = this.httpModel.result;
      this.dataSource = new MatTableDataSource<Empresa>(this.empresas);
      this.dataSource.paginator = this.paginator;
    });
  }
}

