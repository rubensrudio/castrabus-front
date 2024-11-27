import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Animal } from '../../../models/animal.model';
import { AnimalService } from '../../../services/animal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.scss'
})
export class AnimalListComponent implements OnInit {

  @Input() codPage: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  animais: Animal[] = [];
  displayedColumns: string[] = ['id', 'nome', 'ano', 'meses', 'peso', 'chip', 'raca', 'actions'];
  httpModel: any;
  dataSource: any;

  constructor(private animalService: AnimalService
            , private router: Router
            , private mensagem: ToastrService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.codPage == 2) {
        this.loadAnimais();
      }
    });
  }

  ngOnInit(): void {
    this.loadAnimais();
  }

  loadAnimais(): void {
    this.animalService.getAnimais().subscribe(data => {
      this.httpModel = data;
      this.animais = this.httpModel.result;
      this.dataSource = new MatTableDataSource<Animal>(this.animais);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteAnimal(id: number): void {
    this.animalService.deleteAnimal(id).subscribe({
      next: () => {
        this.mensagem.success('Excluído com Sucesso!', 'Sucesso');
        this.animais = this.animais.filter(u => u.id !== id);
        this.loadAnimais();
      },
      error: () => {
        this.mensagem.error('Erro ao excluir!', 'Erro');
      }
    });
  }
}
