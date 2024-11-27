import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from '../../../services/empresa.service';
import { ToastrService } from 'ngx-toastr';
import { TipoEmpresaService } from '../../../services/tipoEmpresa.service';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrl: './empresa-form.component.scss'
})
export class EmpresaFormComponent implements OnInit {
  empresaForm: FormGroup = this.fb.group({
    nomeFantasia: ['', [Validators.required, Validators.maxLength(200)]],
    cnpj: ['', [Validators.required, Validators.maxLength(20)]],
    razaoSocial: ['', [Validators.maxLength(200)]],
    telefone: ['', [Validators.maxLength(30)]],
    responsavel: ['', [Validators.maxLength(50)]],
    email: ['', [Validators.email, Validators.maxLength(100)]],
    tipoEmpresaId: ['', [Validators.required]]
  });

  tipoEmpresas: any[] = [];
  isView: boolean = false;
  isEdit: boolean = false;
  id!: number;
  httpModel: any;

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
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
        this.empresaService.getEmpresa(this.id).subscribe(data => {
          this.empresaForm.patchValue(data);
          if (this.isView) {
            this.empresaForm.disable();
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
    if (this.empresaForm.valid) {
      if (this.isEdit) {
        this.empresaService.updateEmpresa(this.id, this.empresaForm.value).subscribe({
          next: () => {
            this.mensagem.success('Salvo com Sucesso!', 'Sucesso');
            this.router.navigate(['/empresas']);
          },
          error: () => {
            this.mensagem.error('Erro ao salvar!', 'Erro');
          }
        });
      } else {
        this.empresaService.createEmpresa(this.empresaForm.value).subscribe({
          next: () => {
            this.mensagem.success('Salvo com Sucesso!', 'Sucesso');
            this.router.navigate(['/empresas']);
          },
          error: () => {
            this.mensagem.error('Erro ao salvar!', 'Erro');
          }
        });
      }
    }
  }

  navigateToEmpresas(): void {
    this.router.navigate(['/empresas']);
  }
}
