import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { filter } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Pessoa } from '../../../models/pessoa.model';
import { PessoaService } from '../../../services/pessoa.service';

@Component({
  selector: 'app-veterinario-list',
  templateUrl: './veterinario-list.component.html',
  styleUrl: './veterinario-list.component.scss'
})
export class VeterinarioListComponent implements OnInit {

  @Input() codPage: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pessoas: Pessoa[] = [];
  displayedColumns: string[] = ['id', 'nomeCompleto', 'cpf', 'telefone', 'bairro', 'cidade', 'estado', 'actions'];
  httpModel: any;
  dataSource: any;

  constructor(private pessoaService: PessoaService, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.codPage == 13) {
        this.loadPessoas();
      }
    });
  }

  ngOnInit(): void {
    this.loadPessoas();
  }

  loadPessoas(): void {
    this.pessoaService.getPessoas().subscribe(data => {
      this.httpModel = data;
      this.pessoas = this.httpModel.result.filter((p: Pessoa) => p.tipoPessoaId === 2);
      this.dataSource = new MatTableDataSource<Pessoa>(this.pessoas);
      this.dataSource.paginator = this.paginator;
    });
  }

  deletePessoa(id: number): void {
    this.pessoaService.deletePessoa(id).subscribe(() => {
      this.pessoas = this.pessoas.filter(u => u.id !== id);
      this.loadPessoas();
    });
  }
}
