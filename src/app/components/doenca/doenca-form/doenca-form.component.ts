import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoencaService } from '../../../services/doenca.service';
import { AnimalService } from '../../../services/animal.service';
import { ToastrService } from 'ngx-toastr';
import { PessoaService } from '../../../services/pessoa.service';
import { Pessoa } from '../../../models/pessoa.model';
import { TipoDoencaService } from '../../../services/tipoDoenca.service';
import { TipoDoenca } from '../../../models/tipoDoenca.model';
import { Observable } from 'rxjs';
import { map, startWith } from "rxjs/operators";

@Component({
  selector: 'app-doenca-form',
  templateUrl: './doenca-form.component.html',
  styleUrls: ['./doenca-form.component.scss']
})
export class DoencaFormComponent implements OnInit {
  doencaForm: FormGroup;
  isView: boolean = false;
  isEdit: boolean = false;
  id!: number;
  animais: any[] = [];
  pessoa!: Pessoa;
  tipoDoencas: TipoDoenca[] = [];
  httpModel: any;
  tipoDoencaId: number = 0;
  filteredOptions!: Observable<TipoDoenca[]>;

  constructor(
    private fb: FormBuilder,
    private doencaService: DoencaService,
    private animalService: AnimalService,
    private pessoaService: PessoaService,
    private tipoDoencaService: TipoDoencaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.doencaForm = this.fb.group({
      cpfTutor: ['', Validators.required],
      animalId: ['', Validators.required],
      nome: ['', Validators.required],
      tipoDoencaId: [null],
      diagnostico: [''],
      tratamento: ['']
    });
  }

  ngOnInit(): void {
    this.loadTipoDoenca();

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.isView = this.route.snapshot.url[1].path === 'view';
      this.isEdit = this.route.snapshot.url[1].path === 'edit';
      if (this.isView || this.isEdit){
        this.loadDoenca();
      }
    });
  }

  loadTipoDoenca(): void {
    this.tipoDoencaService.getTipoDoencas().subscribe((data) => {
      this.httpModel = data;
      this.tipoDoencas = this.httpModel.result;

      this.filteredOptions = this.doencaForm.get("nome")!.valueChanges.pipe(
        startWith(''),
        map((value: any) => typeof value === "string" ? value : value?.tipoDoenca),
        map((tipoDoenca: string) => this._filter(tipoDoenca || ''))
      );
    });
  }

  loadDoenca(): void {
    this.doencaService.getDoenca(this.id).subscribe((data) => {
      this.doencaForm.patchValue(data);
      this.doencaForm.get("cpfTutor")?.setValue(data.animal?.pessoa?.cpf);
      this.buscarAnimaisEdit();

      if (this.isView) {
        this.doencaForm.disable();
      }
    });
  }

  buscarAnimais(event: Event) {
    event.preventDefault();

    const cpf = this.doencaForm.get('cpfTutor')?.value;
    if (cpf) {
      this.pessoaService.getPessoaByCpf(cpf).subscribe((pessoa) => {
        this.pessoa = pessoa;
        if (this.pessoa?.id !== undefined) {
          this.animalService.getAnimaisByPessoaId(this.pessoa.id).subscribe((animais) => {
            this.animais = animais;
          });
        } else {
          console.error('Pessoa ID não está definido');
        }
      });
    }
  }

  buscarAnimaisEdit() {
    const cpf = this.doencaForm.get('cpfTutor')?.value;
    if (cpf) {
      this.pessoaService.getPessoaByCpf(cpf).subscribe((pessoa) => {
        this.pessoa = pessoa;
        if (this.pessoa?.id !== undefined) {
          this.animalService.getAnimaisByPessoaId(this.pessoa.id).subscribe((animais) => {
            this.animais = animais;
          });
        } else {
          console.error('Pessoa ID não está definido');
        }
      });
    }
  }

  onSubmit(): void {
    if (this.doencaForm.valid) {
      if (this.isEdit) {
        this.doencaService.updateDoenca(this.id, this.doencaForm.value).subscribe({
          next: () => {
            this.toastr.success('Doença atualizada com sucesso!', 'Sucesso');
            this.router.navigate(['/doenca']);
          },
          error: () => {
            this.toastr.error('Erro ao atualizar a doença.', 'Erro');
          }
        });
      } else {
        this.doencaService.createDoenca(this.doencaForm.value).subscribe({
          next: () => {
            this.toastr.success('Doença criada com sucesso!', 'Sucesso');
            this.router.navigate(['/doenca']);
          },
          error: () => {
            this.toastr.error('Erro ao criar a doença.', 'Erro');
          }
        });
      }
    }
  }

  loadTipoDoencaId(id: number): void {
    this.tipoDoencaId = id;
  }

  _filter(tipoDoenca: string): TipoDoenca[] {
    const filterValue = tipoDoenca.toLowerCase();
    return this.tipoDoencas.filter(tp => tp.nome.toLowerCase().includes(filterValue))
  }

  onOptionSelected(event: any) {
    const selectedTipoDoenca = event.option.value;

    if (!this.tipoDoencas.find(tp => tp.nome.toLowerCase() === selectedTipoDoenca.toLowerCase())) {
      this.tipoDoencas.push({nome: selectedTipoDoenca, id: 0})
    }
  }
}
