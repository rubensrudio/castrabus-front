import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import moment from 'moment';
import { CampanhaService } from '../../../services/campanha.service';
import { IbgeService } from '../../../services/ibge.service';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MedicamentoService } from 'src/app/services/medicamento.service';
import { Medicamento } from 'src/app/models/medicamento.model';
import { map, Observable, startWith, switchMap, filter } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { TipoEspecieService } from 'src/app/services/tipoEspecie.service';
import { TipoEspecie } from 'src/app/models/tipoEspecie.model';
import { FaixaHorario } from 'src/app/models/faixaHorario.model';
import { RestricaoMedicamento } from 'src/app/models/restricaoMedicamento.model';

@Component({
  selector: 'app-campanha-form',
  templateUrl: './campanha-form.component.html',
  styleUrl: './campanha-form.component.scss',
  providers:[ DatePipe ]
})
export class CampanhaFormComponent implements OnInit {
  campanhaForm: FormGroup;
  estados: any[] = [];
  cidades: any[] = [];
  bairros: any[] = [];
  id!: number;
  isView: boolean = false;
  isEdit: boolean = false;
  user: any;
  httpModel: any;

  searchControl = new FormControl();
  medicamentosFiltrados!: Observable<Medicamento[]>;

  medicamentosAdicionados: Medicamento[] = [];
  dataSource = new MatTableDataSource<Medicamento>(this.medicamentosAdicionados);

  horariosFiltrados: FaixaHorario[] = [];
  dataSourceFaixaHorario = new MatTableDataSource<FaixaHorario>(this.horariosFiltrados);

  displayedColumns: string[] = ['horario', 'valor'];
  displayedColumnsMedicamentos: string[] = ['nome', 'dosagem', 'unidadeMedida', 'remover'];

  horarioInicio: any;
  horarioFim: any;
  intervaloInicio: any;
  intervaloFim: any;
  tipoEspecie: TipoEspecie[] = [];

  constructor(
    private fb: FormBuilder,
    private campanhaService: CampanhaService,
    private ibgeService: IbgeService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private auth: AuthService,
    private medicamentoService: MedicamentoService,
    private tipoEspecieService: TipoEspecieService,
    private mensagem: ToastrService
  ) {
    this.campanhaForm = this.fb.group({
      empresaId: [''],
      nomecampanha: ['', Validators.required],
      localcampanha: ['', Validators.required],
      estadoId: ['', Validators.required],
      cidadeId: ['', Validators.required],
      bairroId: ['', Validators.required],
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFim: ['', Validators.required],
      horaInicioIntervalo: ['', Validators.required],
      horaFimIntervalo: ['', Validators.required],
      intervaloAtendimento: [0, Validators.required],
      pontuacaoDia: ['', Validators.required],

      diasAtendimento: this.fb.group({
        domingo: [false],
        segunda: [false],
        terca: [false],
        quarta: [false],
        quinta: [false],
        sexta: [false],
        sabado: [false],
      }),

      restricaoEspecie: this.fb.group({
        canino: this.fb.group({
          manha: [false],
          tarde: [false],
        }),
        felino: this.fb.group({
          manha: [false],
          tarde: [false],
        }),
      }),

      faixaHorarios: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadEstados();
    this.loadMedicamentos();
    this.loadTipoEspecies();

    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.isView = this.route.snapshot.url[1].path === 'view';
      this.isEdit = this.route.snapshot.url[1].path === 'edit';
      if (this.isView || this.isEdit) {
        this.campanhaService.getCampanha(this.id).subscribe((data) => {
          data.dataInicio = moment(data.dataInicio, "DD/MM/YYYY").toDate();
          data.dataFim = moment(data.dataFim, "DD/MM/YYYY").toDate();
          this.campanhaForm.patchValue(data);
          this.onEstadoChange();
          this.onCidadeChange();
          if (this.isView) {
            this.campanhaForm.disable();
          }
        });
      }
    });
  }

  loadMedicamentos() {
    this.medicamentosFiltrados = this.searchControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => {
        const nome = typeof value === 'string' ? value : value?.nome;
        return this.medicamentoService.getMedicamentos().pipe(
          map(data => data.result),
          map(medicamentos => (nome ? this._filter(nome, medicamentos) : medicamentos))
        );
      })
    );
  }

  loadTipoEspecies() {
    this.tipoEspecieService.getTipoEspecies().subscribe(data => {
      this.httpModel = data;
      this.tipoEspecie = this.httpModel.result;
    });
  }

  private _filter(nome: string, medicamentos: Medicamento[]): Medicamento[] {
    return medicamentos.filter(medicamento =>
      medicamento.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  adicionarMedicamentoSelecionado(): void {
    const medicamento = this.searchControl.value;
    if (medicamento && !this.medicamentosAdicionados.includes(medicamento)) {
      this.medicamentosAdicionados.push(medicamento);
      this.dataSource.data = [...this.medicamentosAdicionados];
      this.searchControl.setValue('');
    }
  }

  removerMedicamento(medicamento: Medicamento): void {
    this.medicamentosAdicionados = this.medicamentosAdicionados.filter(item => item !== medicamento);
    this.dataSource.data = [...this.medicamentosAdicionados];
  }

  displayFn(medicamento: Medicamento): string {
    return medicamento && medicamento.nome ? medicamento.nome : '';
  }

  loadEstados() {
    this.ibgeService.getEstados().subscribe((data) => {
      this.estados = data;
    });
  }

  onEstadoChange() {
    const estadoId = this.campanhaForm.get('estadoId')?.value;
    this.ibgeService.getCidadesByEstadoId(estadoId).subscribe((data) => {
      this.cidades = data;
    });
  }

  onCidadeChange() {
    const cidadeId = this.campanhaForm.get('cidadeId')?.value;
    this.ibgeService.getBairrosByCidadeId(cidadeId).subscribe((data) => {
      this.bairros = data;
    });
  }

  onSubmit(): void {
    let restricaoMedicamento: RestricaoMedicamento[] = [];
    const formatDateInicio = this.datePipe.transform(this.campanhaForm.get('dataInicio')?.value, 'dd-MM-yyyy');
    const formatDateFim = this.datePipe.transform(this.campanhaForm.get('dataFim')?.value, 'dd-MM-yyyy');

    if (this.campanhaForm.valid) {
      this.auth.getUser().subscribe(user => {
        this.user = user;
      });

      this.campanhaForm.patchValue({
        dataInicio: formatDateInicio,
        dataFim: formatDateFim,
        empresaId: this.user.empresa
      });

      const campanha = this.campanhaForm.value;
      campanha.faixaHorarios.push(this.horariosFiltrados);

      this.medicamentosAdicionados.forEach((el: any) => {
        restricaoMedicamento.push({ campanhaId: this.id, medicamentoId: el.id});
      });

      campanha.restricaoMedicamentos.push(restricaoMedicamento);

      if (this.isEdit) {
        this.campanhaService.updateCampanha(this.id as number, campanha).subscribe({
          next: () => {
            this.mensagem.success('Atualizado com Sucesso!', 'Sucesso');
            this.router.navigate(['/campanhas']);
          },
          error: () => {
            this.mensagem.error('Erro ao atualizar!', 'Erro');
          }
        });
      } else {
        this.campanhaService.createCampanha(campanha).subscribe({
          next: () => {
            this.mensagem.success('Salvo com Sucesso!', 'Sucesso');
            //this.router.navigate(['/campanhas']);
          },
          error: () => {
            this.mensagem.error('Erro ao salvar!', 'Erro');
          }
        });
      }
    }
  }

  verificandoValueDate() {
    if (this.campanhaForm.get('horaInicio')?.value) {
      this.horarioInicio = this.stringToTime(this.campanhaForm.get('horaInicio')?.value);
    }
    else {
      this.mensagem.error('Defina a Hora inicio', 'Erro');
    }

    if (this.campanhaForm.get('horaFim')?.value) {
      this.horarioFim = this.stringToTime(this.campanhaForm.get('horaFim')?.value);
    }
    else {
      this.mensagem.error('Defina a Hora Fim', 'Erro');
    }

    if (this.campanhaForm.get('horaInicioIntervalo')?.value) {
      this.intervaloInicio = this.stringToTime(this.campanhaForm.get('horaInicioIntervalo')?.value);
    }
    else {
      this.mensagem.error('Defina a Hora inicio do intervalo', 'Erro');
    }

    if (this.campanhaForm.get('horaFimIntervalo')?.value) {
      this.intervaloFim = this.stringToTime(this.campanhaForm.get('horaFimIntervalo')?.value);
    }
    else {
      this.mensagem.error('Defina a Hora fim do intervalo', 'Erro');
    }
  }

  gerarHorarios() {
    this.horariosFiltrados = [];
    this.verificandoValueDate();
    const intervalo = this.campanhaForm.get('intervaloAtendimento')?.value;

    if (this.horarioInicio && this.horarioFim && this.intervaloInicio && this.intervaloFim) {
      let horarioAtual = new Date(this.horarioInicio);

      while (horarioAtual <= this.horarioFim) {
        if (horarioAtual < this.intervaloInicio || horarioAtual >= this.intervaloFim) {
          this.horariosFiltrados.push({ horario: new Date(horarioAtual), tipoEspecieId: '' });
        }

        horarioAtual.setMinutes(horarioAtual.getMinutes() + intervalo);
      }

      this.dataSourceFaixaHorario.data = this.horariosFiltrados;
    }
  }

  stringToTime(timeString: string): Date {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }
}
