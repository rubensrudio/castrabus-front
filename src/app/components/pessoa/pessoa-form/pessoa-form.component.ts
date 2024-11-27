import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpModel } from '../../../models/http.model';
import { TipoSexo } from '../../../models/tipoSexo.model';
import { PessoaService } from '../../../services/pessoa.service';
import { TipoSexoService } from '../../../services/tipoSexo.service';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrl: './pessoa-form.component.scss'
})
export class PessoaFormComponent implements OnInit {
  pessoaForm: FormGroup;
  isView: boolean = false;
  isEdit: boolean = false;
  id!: number;
  tipoSexo!: TipoSexo[];
  httpModel!: any;

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private route: ActivatedRoute,
    private router: Router,
    private tipoSexoService: TipoSexoService
  ) {
    this.pessoaForm = this.fb.group({
      nomeCompleto: ['', [Validators.required, Validators.maxLength(255)]],
      dataNascimento: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.maxLength(14)]],
      identidade: ['', [Validators.required, Validators.maxLength(30)]],
      telefone: ['', [Validators.required, Validators.maxLength(30)]],
      endereco: ['', [Validators.required, Validators.maxLength(4000)]],
      bairro: ['', [Validators.required, Validators.maxLength(50)]],
      cidade: ['', [Validators.required, Validators.maxLength(50)]],
      estado: ['', [Validators.required, Validators.maxLength(2)]],
      cep: ['', [Validators.required, Validators.maxLength(9)]],
      email: ['', [Validators.email, Validators.maxLength(100)]],
      crmv: ['', Validators.maxLength(100)],
      usuarioId: ['', Validators.nullValidator],
      sexoId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.isView = this.route.snapshot.url[1].path === 'view';
      this.isEdit = this.route.snapshot.url[1].path === 'edit';
      if (this.isView || this.isEdit) {
        this.pessoaService.getPessoa(this.id).subscribe(data => {
          this.pessoaForm.patchValue(data);
          if (this.isView) {
            this.pessoaForm.disable();
          }
        });
      }
    });
    this.tipoSexoService.getTipoSexos().subscribe(data => {
      this.httpModel = data;
      this.tipoSexo = this.httpModel.result;
    });
  }

  onSubmit(): void {
    if (this.pessoaForm.valid) {
      if (this.isEdit) {
        this.pessoaService.updatePessoa(this.id, this.pessoaForm.value).subscribe(() => {
          this.router.navigate(['/pessoas']);
        });
      } else {
        this.pessoaService.createPessoa(this.pessoaForm.value).subscribe(() => {
          this.router.navigate(['/pessoas']);
        });
      }
    }
  }

  navigateToPessoas(): void {
    this.router.navigate(['/pessoas']);
  }
}
