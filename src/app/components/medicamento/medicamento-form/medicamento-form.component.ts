import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Recomendacao } from 'src/app/models/recomendacao.model';
import { TipoEspecie } from 'src/app/models/tipoEspecie.model';
import { AuthService } from 'src/app/services/auth.service';
import { MedicamentoService } from 'src/app/services/medicamento.service';
import { TipoEspecieService } from 'src/app/services/tipoEspecie.service';
import { DialogRecomendacaoComponent } from 'src/app/shared/components/dialog-recomendacao/dialog-recomendacao.component';

@Component({
  selector: 'app-medicamento-form',
  templateUrl: './medicamento-form.component.html',
  styleUrl: './medicamento-form.component.scss'
})
export class MedicamentoFormComponent implements OnInit {
  medicamentoForm: FormGroup;
  httpModel: any;
  isView: boolean = false;
  isEdit: boolean = false;
  id!: number;
  user: any;

  tipoEspecie: TipoEspecie[] = [];
  dataSource: Recomendacao[] = [];
  displayedColumns: string[] = ['faixaPeso', 'quantidadeComprimidos', 'dose', 'dias', 'uso', 'actions'];
  capsulaComprimidos: string[] = ['Caspsula', 'Comprimido', 'Gotas'];

  constructor(
    private fb: FormBuilder,
    private medicamentoService: MedicamentoService,
    private route: ActivatedRoute,
    private router: Router,
    private mensagem: ToastrService,
    public dialog: MatDialog,
    private auth: AuthService,
    private tipoEspecieService: TipoEspecieService
  ) {
    this.medicamentoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(255)]],
      capsulaComprimido: ['', [Validators.required, Validators.maxLength(255)]],
      dosagem: ['', [Validators.required]],
      unidadeMedida: ['', [Validators.required, Validators.maxLength(255)]],
      tipoEspecie_Id: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.isView = this.route.snapshot.url[1].path === 'view';
      this.isEdit = this.route.snapshot.url[1].path === 'edit';

      if (this.isView || this.isEdit) {
        this.loadMedicamento();
      }
    });

    this.loadTipoEspecie();
  }

  loadTipoEspecie() {
    this.tipoEspecieService.getTipoEspecies().subscribe(data => {
      this.httpModel = data;
      this.tipoEspecie = this.httpModel.result;
    });
  }

  loadMedicamento() {
    this.medicamentoService.getMedicamento(this.id).subscribe(data => {
      this.medicamentoForm.patchValue({
        nome: data.nome,
        capsulaComprimido: data.capsulaComprimido,
        dosagem: data.dosagem,
        unidadeMedida: data.unidadeMedida,
        tipoEspecie_Id: data.tipoEspecie_Id
      });

      data.recomendacoes?.forEach(element => {
        this.dataSource.push(element);
      });

      this.dataSource = [...this.dataSource];

      if (this.isView) {
        this.medicamentoForm.disable();
      }
    });
  }

  onTipoMedicamentoChange(cp: string): void {

  }

  onSubmit(): void {
    if (this.medicamentoForm.valid) {
      this.auth.getUser().subscribe(user => {
        if (this.dataSource.length == 0) {
          this.mensagem.error('Erro ao salvar! É necessario possuir uma recomendação', 'Erro');
        }
        else {
          this.user = user;

          let medicamento = {
            id: this.id,
            nome: this.medicamentoForm.get('nome')?.value,
            capsulaComprimido: this.medicamentoForm.get('capsulaComprimido')?.value,
            dosagem: this.medicamentoForm.get('dosagem')?.value,
            unidadeMedida: this.medicamentoForm.get('unidadeMedida')?.value,
            tipoEspecie_Id: this.medicamentoForm.get('tipoEspecie_Id')?.value,
            recomendacoes: this.dataSource
          }

          if (this.isEdit) {
            this.medicamentoService.updateMedicamento(this.id, medicamento).subscribe({
              next: () => {
                this.mensagem.success('Atualizado com Sucesso!', 'Sucesso');
                this.router.navigate(['/medicamento']);
              },
              error: () => {
                this.mensagem.error('Erro ao salvar!', 'Erro');
              }
            });
          }
          else {
            this.medicamentoService.createMedicamento(medicamento).subscribe({
              next: () => {
                this.mensagem.success('Salvo com Sucesso!', 'Sucesso');
                this.router.navigate(['/medicamento']);
              },
              error: () => {
                this.mensagem.error('Erro ao salvar!', 'Erro');
              }
            });
          }
        }
      });
    }
  }

  openDialog() {
    const lastId = this.dataSource.reduce((maxId, item) => Math.max(maxId, item.id), 0);
    const dialogRef = this.dialog.open(DialogRecomendacaoComponent, {
      data: {
        isNew: true,
        item: null,
        ultimoId: lastId
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.push(result);
        this.dataSource = [...this.dataSource];
      }
    });
  }

  editItem(recomendacao: any) {
    const dialogRef = this.dialog.open(DialogRecomendacaoComponent, {
      data: {
        isNew: false,
        item: recomendacao
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let index: any = this.dataSource.filter(item => item.id == recomendacao.id);
        if (index) {
          this.dataSource.splice(index, 1);
          this.dataSource.push(result);
          this.dataSource = [...this.dataSource];
        }
      }
    });
  }

  deleteItem(recomendacao: any) {
    const index = this.dataSource.indexOf(recomendacao);
    if (index >= 0) {
      this.dataSource.splice(index, 1);
      this.dataSource = [...this.dataSource];
    }
  }
}
