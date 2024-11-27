import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from '../../../models/empresa.model';
import { Perfil } from '../../../models/perfil.model';
import { UsuarioService } from '../../../services/usuario.service';
import { EmpresaService } from '../../../services/empresa.service';
import { PerfilService } from '../../../services/perfil.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})
export class UsuarioFormComponent implements OnInit {
  usuarioForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.maxLength(255)]],
    empresaId: ['', [Validators.required]],
    perfilId: ['', [Validators.required]],
  });
  isView: boolean = false;
  isEdit: boolean = false;
  id!: number;
  empresas: Empresa[] = [];
  perfis: Perfil[] = [];
  httpModel: any;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private empresaService: EmpresaService,
    private perfilService: PerfilService
  ) {}

  ngOnInit(): void {
    this.empresaService.getEmpresas().subscribe((data) => {
      this.httpModel = data;
      this.empresas = this.httpModel.result;
    });
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.isView = this.route.snapshot.url[1].path === 'view';
      this.isEdit = this.route.snapshot.url[1].path === 'edit';
      if (this.isView || this.isEdit) {
        this.usuarioService.getUsuario(this.id).subscribe(data => {
          this.usuarioForm.patchValue(data);
          if (this.isView) {
            this.usuarioForm.disable();
          }
        });
      }
    });
  }

  getPerfis(event: any) {
    const empresaId = event;
    console.log(empresaId);
    this.perfilService.getPerfisById(empresaId).subscribe((data) => {
      this.perfis = data;
    });
  }

  onSubmit(): void {
    if (this.usuarioForm.valid) {
      if (this.isEdit) {
        this.usuarioService.updateUsuario(this.id, this.usuarioForm.value).subscribe(() => {
          this.router.navigate(['/usuarios']);
        });
      } else {
        this.usuarioService.createUsuario(this.usuarioForm.value).subscribe(() => {
          this.router.navigate(['/usuarios']);
        });
      }
    }
  }

  navigateToUsuarios(): void {
    this.router.navigate(['/usuarios']);
  }
}
