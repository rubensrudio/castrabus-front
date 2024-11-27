import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratanteService } from '../../../services/contratante.service';
import { ToastrService } from 'ngx-toastr';
import { TipoEmpresaService } from '../../../services/tipoEmpresa.service';

@Component({
  selector: 'app-contratante-form',
  templateUrl: './contratante-form.component.html',
  styleUrl: './contratante-form.component.scss'
})
export class ContratanteFormComponent implements OnInit {
  contratanteForm: FormGroup = this.fb.group({
    nomeFantasia: ['', [Validators.required, Validators.maxLength(200)]],
    cnpj: ['', [Validators.required, Validators.maxLength(20)]],
    razaoSocial: ['', [Validators.maxLength(200)]],
    telefone: ['', [Validators.maxLength(30)]],
    responsavel: ['', [Validators.maxLength(50)]],
    email: ['', [Validators.email, Validators.maxLength(100)]],
    tipoEmpresaId: ['', [Validators.required]],
    //arquivos: null
  });

  tipoEmpresas: any[] = [];
  isView: boolean = false;
  isEdit: boolean = false;
  id!: number;
  httpModel: any;
  uploadedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private contratanteService: ContratanteService,
    private tipoEmpresaService: TipoEmpresaService,
    private route: ActivatedRoute,
    private router: Router,
    private mensagem: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadTipoEmpresas();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.isView = this.route.snapshot.url[1].path === 'view';
      this.isEdit = this.route.snapshot.url[1].path === 'edit';

      if (this.isView || this.isEdit) {
        this.contratanteService.getContratante(this.id).subscribe(data => {
          this.contratanteForm.patchValue(data);
          if (this.isView) {
            this.contratanteForm.disable();
          }
        });
      }
    });
  }

  loadTipoEmpresas() {
    this.tipoEmpresaService.getTipoEmpresas().subscribe((data) => {
      this.httpModel = data;
      this.tipoEmpresas = this.httpModel.result;
    });
  }

  onSubmit(): void {
    if (this.contratanteForm.valid) {
      if (this.isEdit) {
        this.contratanteService.updateContratante(this.id, this.contratanteForm.value).subscribe({
          next: () => {
            this.mensagem.success('Salvo com Sucesso!', 'Sucesso');
            this.router.navigate(['/contratante']);
          },
          error: () => {
            this.mensagem.error('Erro ao salvar!', 'Erro');
          }
        });
      } else {
        this.contratanteService.createContratante(this.contratanteForm.value).subscribe({
          next: () => {
            this.mensagem.success('Salvo com Sucesso!', 'Sucesso');
            this.router.navigate(['/contratante']);
          },
          error: () => {
            this.mensagem.error('Erro ao salvar!', 'Erro');
          }
        });
      }
    }
  }

  navigateToContratantes(): void {
    this.router.navigate(['/contratante']);
  }

  onFileSelected(event: any): void {
    for (let i = 0; i < event.target.files.length; i++) {
      this.uploadedFiles.push(event.target.files[i]);
    }
  }

  removeFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
  }
}
