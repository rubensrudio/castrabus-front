import { filter } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NavigationEnd, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Medicamento } from 'src/app/models/medicamento.model';
import { MedicamentoService } from 'src/app/services/medicamento.service';

@Component({
  selector: 'app-medicamento-list',
  templateUrl: './medicamento-list.component.html',
  styleUrl: './medicamento-list.component.scss'
})
export class MedicamentoListComponent {

  @Input() codPage: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  medicamentos: Medicamento[] = [];
  displayedColumns: string[] = ['id', 'nome', 'dosagem', 'capsulaComprimido', 'actions'];
  httpModel: any;
  dataSource: any;

  constructor(private medicamentoService: MedicamentoService
            , private router: Router
            , private mensagem: ToastrService) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      if (this.codPage == 7) {
        this.loadMedicamentos();
      }
    });
  }

  ngOnInit(): void {
    this.loadMedicamentos();
  }

  loadMedicamentos(): void {
    this.medicamentoService.getMedicamentos().subscribe(data => {
      this.httpModel = data;
      this.medicamentos = this.httpModel.result;
      this.dataSource = new MatTableDataSource<Medicamento>(this.medicamentos);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteMedicamento(id: number): void {
    this.medicamentoService.deleteMedicamento(id).subscribe({
      next: () => {
        this.mensagem.success('Excluído com Sucesso!', 'Sucesso');
        this.medicamentos = this.medicamentos.filter(u => u.id !== id);
        this.loadMedicamentos();
      },
      error: () => {
        this.mensagem.error('Erro ao salvar!', 'Erro');
      }
    });
  }
}
