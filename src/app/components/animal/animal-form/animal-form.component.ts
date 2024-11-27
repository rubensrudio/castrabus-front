import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pessoa } from '../../../models/pessoa.model';
import { TipoSexo } from '../../../models/tipoSexo.model';
import { TipoEspecie } from '../../../models/tipoEspecie.model';
import { AnimalService } from '../../../services/animal.service';
import { PessoaService } from '../../../services/pessoa.service';
import { TipoSexoService } from '../../../services/tipoSexo.service';
import { TipoEspecieService } from '../../../services/tipoEspecie.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrl: './animal-form.component.scss'
})
export class AnimalFormComponent implements OnInit {
  animalForm: FormGroup;
  pessoas: Pessoa[] = [];
  tipoSexo: TipoSexo[] = [];
  tipoEspecie: TipoEspecie[] = [];
  isView: boolean = false;
  isEdit: boolean = false;
  id!: number;
  httpModel: any;
  pessoa!: Pessoa;

  constructor(
    private fb: FormBuilder,
    private animalService: AnimalService,
    private pessoaService: PessoaService,
    private tipoSexoService: TipoSexoService,
    private tipoEspecieService: TipoEspecieService,
    private route: ActivatedRoute,
    private router: Router,
    private mensagem: ToastrService
  ) {
    this.animalForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      ano: [''],
      meses: [''],
      peso: ['', Validators.required],
      chip: ['', Validators.maxLength(50)],
      raca: ['', Validators.maxLength(50)],
      sexoId: ['', Validators.required],
      especieId: ['', Validators.required],
      pessoaId: ['', Validators.required],
      cpf: ['', Validators.required],
      tutor: ['', Validators.required],
      pelagem: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.pessoaService.getPessoasByTipoPessoaId(1).subscribe(data => {
      this.httpModel = data;
      this.pessoas = this.httpModel.result;
    });

    this.tipoSexoService.getTipoSexos().subscribe(data => {
        this.httpModel = data;
        this.tipoSexo = this.httpModel.result;
    });

    this.tipoEspecieService.getTipoEspecies().subscribe(data => {
        this.httpModel = data;
        this.tipoEspecie = this.httpModel.result;
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.isView = this.route.snapshot.url[1].path === 'view';
      this.isEdit = this.route.snapshot.url[1].path === 'edit';
      if (this.isView || this.isEdit) {
        this.animalService.getAnimal(this.id).subscribe(data => {
          this.animalForm.patchValue(data);

          this.pessoaService.getPessoa(data.pessoaId).subscribe(pessoa => {
            this.animalForm.get('tutor')?.setValue(pessoa.nomeCompleto);
            this.animalForm.get('cpf')?.setValue(pessoa.cpf);
          });
          if (this.isView) {
            this.animalForm.disable();
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.animalForm.valid) {
      if (this.isEdit) {
        this.animalService.updateAnimal(this.id, this.animalForm.value).subscribe({
          next: () => {
            this.mensagem.success('Atualizado com Sucesso!', 'Sucesso');
            this.router.navigate(['/animais']);
          },
          error: () => {
            this.mensagem.error('Erro ao realizar atualizar!', 'Erro');
          }
        });
      } else {
        this.animalService.createAnimal(this.animalForm.value).subscribe({
          next: () => {
            this.mensagem.success('Salvo com Sucesso!', 'Sucesso');
            this.router.navigate(['/animais']);
          },
          error: () => {
            this.mensagem.error('Erro ao salvar!', 'Erro');
          }
        });
      }
    }
  }

  buscarTutor(event: Event) {
    event.preventDefault();

    const cpf = this.animalForm.get('cpf')?.value;
    if (cpf) {
      this.pessoaService.getPessoaByCpf(cpf).subscribe((pessoa) => {
        this.pessoa = pessoa;
        if (this.pessoa === null) {
          this.mensagem.error('Tutor não localizado!', 'Erro');
          this.animalForm.get('tutor')?.setValue('');
          return;
        }
        this.animalForm.get('pessoaId')?.setValue(pessoa.id);
        this.animalForm.get('tutor')?.setValue(pessoa.nomeCompleto);
      });
    }
  }
}
