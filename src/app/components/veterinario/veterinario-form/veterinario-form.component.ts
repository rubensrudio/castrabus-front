import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpModel } from '../../../models/http.model';
import { TipoSexo } from '../../../models/tipoSexo.model';
import { PessoaService } from '../../../services/pessoa.service';
import { TipoSexoService } from '../../../services/tipoSexo.service';
import { IbgeService } from '../../../services/ibge.service';
import * as crypto from 'crypto-js';
import { senhaRequiredIfUsuarioIdZero } from 'src/app/shared/validators/senhaRequired';

const VETERINARIO_TIPO_PESSOA_ID = 2;

@Component({
  selector: 'app-veterinario-form',
  templateUrl: './veterinario-form.component.html',
  styleUrl: './veterinario-form.component.scss'
})
export class VeterinarioFormComponent implements OnInit {
  pessoaForm: FormGroup;
  isView: boolean = false;
  isEdit: boolean = false;
  id!: number;
  tipoSexo!: TipoSexo[];
  httpModel!: any;
  senhaEnable = false;
  estados: any[] = [];
  cidades: any[] = [];
  bairros: any[] = [];

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private route: ActivatedRoute,
    private router: Router,
    private tipoSexoService: TipoSexoService,
    private ibgeService: IbgeService
  ) {
    this.pessoaForm = this.fb.group({
      nomeCompleto: ['', [Validators.required, Validators.maxLength(255)]],
      dataNascimento: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.maxLength(14)]],
      identidade: ['', [Validators.required, Validators.maxLength(30)]],
      telefone: ['', [Validators.required, Validators.maxLength(30)]],
      endereco: ['', [Validators.required, Validators.maxLength(4000)]],
      estadoId: ['', Validators.required],
      cidadeId: ['', Validators.required],
      bairroId: ['', Validators.required],
      cep: ['', [Validators.required, Validators.maxLength(9)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      usuarioId: [0],
      sexoId: ['', Validators.required],
      crmv: ['', Validators.maxLength(100)],
      tipoPessoaId: [VETERINARIO_TIPO_PESSOA_ID],
      senha: ['', [Validators.maxLength(100), senhaRequiredIfUsuarioIdZero()]]
    });
  }

  ngOnInit(): void {
    this.loadEstados();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.isView = this.route.snapshot.url[1].path === 'view';
      this.isEdit = this.route.snapshot.url[1].path === 'edit';
      if (this.isView || this.isEdit) {
        this.pessoaService.getPessoa(this.id).subscribe(data => {
            this.pessoaForm.patchValue({
                nomeCompleto: data.nomeCompleto,
                dataNascimento: data.dataNascimento,
                cpf: data.cpf,
                identidade: data.identidade,
                telefone: data.telefone,
                endereco: data.endereco,
                bairroId: data.bairroId,
                cidadeId: data.cidadeId,
                estadoId: data.estadoId,
                cep: data.cep,
                email: data.email,
                crmv: data.crmv,
                usuarioId: data.usuarioId,
                sexoId: data.sexoId
            });
            this.onEstadoChange();
            this.onCidadeChange();
            if (this.isView) {
                this.pessoaForm.disable();
            }
        });
        this.senhaEnable = false;
    }
    else {
      this.senhaEnable = true;
    }
    });
    this.tipoSexoService.getTipoSexos().subscribe(data => {
      this.httpModel = data;
      this.tipoSexo = this.httpModel.result;
    });
    this.pessoaForm.get('usuarioId')?.valueChanges.subscribe(value => {
      this.pessoaForm.get('senha')?.updateValueAndValidity();
    });
  }

  loadEstados() {
    this.ibgeService.getEstados().subscribe((data) => {
      this.estados = data;
    });
  }

  onEstadoChange() {
    const estadoId = this.pessoaForm.get('estadoId')?.value;
    this.ibgeService.getCidadesByEstadoId(estadoId).subscribe((data) => {
      this.cidades = data;
    });
  }

  onCidadeChange() {
    const cidadeId = this.pessoaForm.get('cidadeId')?.value;
    this.ibgeService.getBairrosByCidadeId(cidadeId).subscribe((data) => {
      this.bairros = data;
    });
  }

  onSubmit(): void {
    if (this.pessoaForm.valid) {
        this.pessoaForm.patchValue({
          senha: crypto.SHA256(this.pessoaForm.get('senha')?.value).toString()
        })
        const pessoaData = this.pessoaForm.value;
        if (this.isEdit) {
            this.pessoaService.updatePessoa(this.id, pessoaData).subscribe(() => {
                this.router.navigate(['/veterinario']);
            });
        } else {
            this.pessoaService.createPessoa(pessoaData).subscribe(() => {
                this.router.navigate(['/veterinario']);
            });
        }
    }
}


  navigateToPessoas(): void {
    this.router.navigate(['/veterinario']);
  }
}
