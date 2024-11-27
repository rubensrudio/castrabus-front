import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VacinaService } from '../../../services/vacina.service';
import { Animal } from '../../../models/animal.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Pessoa } from '../../../models/pessoa.model';
import { PessoaService } from '../../../services/pessoa.service';
import { AnimalService } from '../../../services/animal.service';
import { Vacina } from '../../../models/vacina.model';
import { TipoVacinaService } from '../../../services/tipoVacina.service';
import { TipoVacina } from '../../../models/tipoVacina.model';
import { Observable } from 'rxjs';
import { map, startWith } from "rxjs/operators";
import { DatePipe } from '@angular/common';
import moment from 'moment';

@Component({
  selector: 'app-vacina-form',
  templateUrl: './vacina-form.component.html',
  styleUrls: ['./vacina-form.component.scss'],
  providers:[ DatePipe ]
})
export class VacinaFormComponent implements OnInit {
  vacinaForm: FormGroup;
  isView: boolean = false;
  isEdit: boolean = false;
  id!: number;
  animais: Animal[] = [];
  pessoa!: Pessoa;
  vacinaData!: Vacina;
  tipoVacinas: TipoVacina[] = [];
  httpModel: any;
  tipoVacinaId: number = 0;
  filteredOptions!: Observable<TipoVacina[]>;

  constructor(
    private fb: FormBuilder,
    private vacinaService: VacinaService,
    private tipoVacinaService: TipoVacinaService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private pessoaService: PessoaService,
    private animalService: AnimalService
  ) {
    this.vacinaForm = this.fb.group({
      cpfTutor: ['', [Validators.required, Validators.maxLength(14)]],
      animalId: [null, Validators.required],
      tipoVacinaId: [null],
      nome: ['', [Validators.required, Validators.maxLength(255)]],
      dataVacinacao: ['', Validators.required],
      dataProximaVacinacao: [''],
      observacao: ['', Validators.maxLength(4000)]
    });
  }

  ngOnInit(): void {
    this.loadTipoVacina();

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.isView = this.route.snapshot.url[1].path === 'view';
      this.isEdit = this.route.snapshot.url[1].path === 'edit';
      if (this.isView || this.isEdit) {
        this.loadVacina();
      }
    });
  }

  loadVacina(): void {
    this.vacinaService.getVacinaById(this.id).subscribe(data => {
      this.vacinaForm.patchValue(data);
      this.vacinaForm.get("cpfTutor")?.setValue(data.animal?.pessoa?.cpf);
      this.buscarAnimaisEdit();

      if (this.isView) {
        this.vacinaForm.disable();
      }
    });
  }

  loadTipoVacina(): void {
    this.tipoVacinaService.getTipoVacinas().subscribe(data => {
      this.httpModel = data;
      this.tipoVacinas = this.httpModel.result;

      this.filteredOptions = this.vacinaForm.get("nome")!.valueChanges.pipe(
        startWith(''),
        map((value: any) => typeof value === "string" ? value : value?.tipoVacina),
        map((tipoVacina: string) => this._filter(tipoVacina || ''))
      );
    });
  }

  buscarAnimais(event: Event) {
    event.preventDefault();

    const cpf = this.vacinaForm.get('cpfTutor')?.value;
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
    const cpf = this.vacinaForm.get('cpfTutor')?.value;
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
    if (this.vacinaForm.valid) {
      this.vacinaData = {
        animalId: this.vacinaForm.value.animalId,
        tipoVacinaId: this.tipoVacinaId,
        dataProximaVacinacao: this.convertDataBR(this.vacinaForm.value.dataProximaVacinacao),
        dataVacinacao: this.convertDataBR(this.vacinaForm.value.dataVacinacao),
        nome: this.vacinaForm.value.nome,
        observacao: this.vacinaForm.value.observacao
      };

      if (this.isEdit) {
        this.vacinaService.updateVacina(this.id, this.vacinaData).subscribe({
          next: () => {
            this.toastr.success('Vacina atualizada com sucesso!', 'Sucesso');
            this.router.navigate(['/vacina']);
          },
          error: () => {
            this.toastr.error('Erro ao atualizar a vacina.', 'Erro');
          }
        });
      } else {
        this.vacinaService.createVacina(this.vacinaData).subscribe({
          next: () => {
            this.toastr.success('Vacina cadastrada com sucesso!', 'Sucesso');
            this.router.navigate(['/vacina']);
          },
          error: () => {
            this.toastr.error('Erro ao cadastrar vacina.', 'Erro');
          }
        });
      }
    }
  }

  private convertDataBR(date: Date | null): any {
    if (date === null) return null;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
     const year = date.getFullYear();
     return `${day}/${month}/${year}`;
  }

  loadTipoVacinaId(id: number): void {
    this.tipoVacinaId = id;
  }

  onInputChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;

    const selectedOption = this.tipoVacinas.find(option => option.nome === inputValue);

    if (!selectedOption) {
      this.tipoVacinaId = 0;
    }
  }

  _filter(tipoVacina: string): TipoVacina[] {
    const filterValue = tipoVacina.toLowerCase();
    return this.tipoVacinas.filter(tp => tp.nome.toLowerCase().includes(filterValue))
  }

  onOptionSelected(event: any) {
    const selectedTipoVacina = event.option.value;

    if (!this.tipoVacinas.find(tp => tp.nome.toLowerCase() === selectedTipoVacina.toLowerCase())) {
      this.tipoVacinas.push({nome: selectedTipoVacina, id: 0})
    }
  }
}
