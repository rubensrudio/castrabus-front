import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioVm } from '../../../models/usuario.model';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.scss'
})
export class UsuarioListComponent implements OnInit {

  @Input() codPage: any;

  usuarios: UsuarioVm[] = [];
  displayedColumns: string[] = ['id', 'nomeCompleto', 'actions'];
  httpModel: any;
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.codPage == 11) {
        this.loadUsuarios();
      }
    });
  }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.httpModel = data;
      this.usuarios = this.httpModel.result;
      this.dataSource = new MatTableDataSource<UsuarioVm>(this.usuarios);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteUsuario(id: number): void {
    this.usuarioService.deleteUsuario(id).subscribe(() => {
      this.usuarios = this.usuarios.filter(u => u.id !== id);
      this.loadUsuarios();
    });
  }
}
