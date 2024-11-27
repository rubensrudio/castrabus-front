import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from '../../../services/perfil.service';
import { ModuloService } from '../../../services/modulo.service';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Modulo } from '../../../models/modulo.model';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.scss']
})
export class PerfilFormComponent implements OnInit {
  perfilForm: FormGroup;
  modulos: Modulo[] = [];
  isView: boolean = false;
  isEdit: boolean = false;
  id!: number;
  roles: string[] = ['ADM', 'USER'];
  user: any;

  constructor(
    private fb: FormBuilder,
    private perfilService: PerfilService,
    private moduloService: ModuloService,
    private route: ActivatedRoute,
    private router: Router,
    private mensagem: ToastrService,
    private auth: AuthService,
  ) {
    this.perfilForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(255)]],
      role: ['', [Validators.required]],
      empresaId: ['0', [Validators.required]],
      permissoes: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.moduloService.getModulos().subscribe(response => {
      this.modulos = response.result;
      this.perfilForm.setControl('permissoes', this.fb.array(
        this.modulos.map(modulo => this.createPermissaoFormGroup(modulo))
      ));
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.isView = this.route.snapshot.url[1].path === 'view';
      this.isEdit = this.route.snapshot.url[1].path === 'edit';

      if (this.isView || this.isEdit) {
        this.perfilService.getPerfil(this.id).subscribe(data => {
          this.perfilForm.patchValue({
            nome: data.nome,
            role: data.role
          });
          if (this.isView) {
            this.perfilForm.disable();
          }

          this.permissoes.clear();
          data.permissoes.forEach(permissao => {
            this.permissoes.push(this.fb.group({
              id: permissao.id,
              moduloId: permissao.moduloId,
              nome: permissao.nome,
              inserir: permissao.inserir,
              editar: permissao.editar,
              excluir: permissao.excluir,
              visualizar: permissao.visualizar
            }));
          });
        });
      }
    });
  }

  get permissoes(): FormArray {
    return this.perfilForm.get('permissoes') as FormArray;
  }

  createPermissaoFormGroup(modulo: Modulo): FormGroup {
    return this.fb.group({
      id: [modulo.id],
      moduloId: [modulo.id, Validators.required],
      nome: [modulo.nome],
      inserir: [false],
      editar: [false],
      excluir: [false],
      visualizar: [false]
    });
  }

  onRoleChange(role: string): void {
    this.permissoes.controls.forEach(control => {
      if (control instanceof FormGroup) {
        if (role === 'ADM') {
          control.patchValue({
            inserir: true,
            editar: true,
            excluir: true,
            visualizar: true
          });
        } else if (role === 'USER') {
          control.patchValue({
            inserir: false,
            editar: false,
            excluir: false,
            visualizar: false
          });
        }
      }
    });
  }

  onRoleChangeId(): void {
    this.permissoes.controls.forEach(control => {
      if (control instanceof FormGroup) {
        control.patchValue({
          id: 0
        });
      }
    });
  }

  onSubmit(): void {
    if (this.perfilForm.valid) {
      this.auth.getUser().subscribe(user => {
        this.user = user;
        this.perfilForm.patchValue({
          empresaId: this.user.empresa
        });
        if (this.isEdit) {
          this.perfilService.updatePerfil(this.id, this.perfilForm.value).subscribe({
            next: () => {
              this.mensagem.success('Atualizado com Sucesso!', 'Sucesso');
              this.router.navigate(['/perfis']);
            },
            error: () => {
              this.mensagem.error('Erro ao salvar!', 'Erro');
            }
          });
        } else {
          this.onRoleChangeId();
          this.perfilService.createPerfil(this.perfilForm.value).subscribe({
            next: () => {
              this.mensagem.success('Salvo com Sucesso!', 'Sucesso');
              this.router.navigate(['/perfis']);
            },
            error: () => {
              this.mensagem.error('Erro ao salvar!', 'Erro');
            }
          });
        }
      });
    }
  }
}