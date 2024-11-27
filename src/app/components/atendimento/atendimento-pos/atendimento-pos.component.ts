import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith, switchMap, filter } from 'rxjs';
import { Atendimento } from 'src/app/models/atendimento.model';
import { Medicamento } from 'src/app/models/medicamento.model';
import { Pessoa } from 'src/app/models/pessoa.model';
import { Receita } from 'src/app/models/receita.model';
import { Recomendacao } from 'src/app/models/recomendacao.model';
import { AtendimentoService } from 'src/app/services/atendimento.service';
import { MedicamentoService } from 'src/app/services/medicamento.service';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-atendimento-pos',
  templateUrl: './atendimento-pos.component.html',
  styleUrls: ['./atendimento-pos.component.scss']
})
export class AtendimentoPosComponent implements OnInit {
  id!: string;
  searchControl = new FormControl();
  medicamentosFiltrados!: Observable<Medicamento[]>;
  medicamentosAdicionados: Medicamento[] = [];
  dataSource = new MatTableDataSource<Medicamento>(this.medicamentosAdicionados);
  displayedColumns: string[] = ['nome', 'dosagem', 'unidadeMedida', 'remover'];
  atendimentoForm: FormGroup;
  receita!: Receita;
  atendimento!: Atendimento;
  senha!: string;
  animal!: any;
  veterinarios: Pessoa[] = [];

  constructor(
    private fb: FormBuilder,
    private medicamentoService: MedicamentoService,
    private atendimentoService: AtendimentoService,
    private pessoaService: PessoaService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.atendimentoForm = this.fb.group({
      id: [0, Validators.required],
      agendamento_Id:  [0, Validators.required],
      tutor_Id:  [0, Validators.required],
      animal_Id:  [0, Validators.required],
      CPF: ['', Validators.required],
      nomeCompleto: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nome: ['', Validators.required],
      raca: ['', Validators.required],
      peso: ['', Validators.required],
      ano: ['', Validators.required],
      chip: ['', Validators.required],
      pelagem: ['', Validators.required],
      sexoId: ['', Validators.required],
      especieId: ['', Validators.required],
      senhaAtendimento: ['', Validators.required],
      tipoCirurgia: ['Castração', Validators.required],
      dataAtendimento: ['', Validators.required],
      jejum: ['', Validators.required],
      ultimaAlimentacao: ['', Validators.required],
      ultimaIngestaoLiquidos: ['', Validators.required],
      presoDuranteNoite: ['', Validators.required],
      soltoDuranteNoite: ['', Validators.required],
      horarioPreso: [''],
      urinandoNormalmente: ['', Validators.required],
      antiCio: ['', Validators.required],
      ultimaAplicacao: [''],
      cioRecente: ['', Validators.required],
      quandoCruzou: [''],
      filhoteRecente: ['', Validators.required],
      idadeFilhote: [0],
      historicoVeterinario: ['', Validators.required],
      tratamentoCirurgico: ['', Validators.required],
      quandoTratamentoCirurgico: [''],
      observacoesComportamento: ['', Validators.required],
      historicoDoencas: ['', Validators.required],
      criseEpileptica: ['', Validators.required],
      desmaios: ['', Validators.required],
      vermifugado: ['', Validators.required],
      veterinario_Id: ['', Validators.required],
      esterilizacao: ['', Validators.required],
      motivoEsterilizacao: [''],
      intercorrencia: ['', Validators.required],
      motivoIntercorrencia: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      if (typeof this.id !== 'undefined') {
        this.loadAtendimento();
      }

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

      this.loadVeterinarios();
    });
  }

  loadAtendimento(): void {
    this.atendimentoService.getObterAtendimentoBySenhaAtendimento(this.id).subscribe((data) => {
      this.animal = data.animal;

      this.atendimentoForm.patchValue({
          id: data.id,
          agendamento_Id: data.agendamento_Id,
          tutor_Id: data.tutor_Id,
          animal_Id: data.animal_Id,
          CPF: data.tutor.cpf,
          nomeCompleto: data.tutor.nomeCompleto,
          telefone: data.tutor.telefone,
          email: data.tutor.email,
          nome: data.animal.nome,
          ano: data.animal.ano,
          peso: data.animal.peso,
          raca: data.animal.raca,
          chip: data.animal.chip,
          pelagem: data.animal.pelagem,
          sexoId: data.animal.sexoId,
          especieId: data.animal.especieId,
          senhaAtendimento: this.id,
          dataAtendimento: data.dataAtendimento,
          jejum: data.jejum,
          ultimaAlimentacao: data.ultimaAlimentacao,
          ultimaIngestaoLiquidos: data.ultimaIngestaoLiquidos,
          presoDuranteNoite: data.presoDuranteNoite,
          soltoDuranteNoite: data.soltoDuranteNoite,
          horarioPreso: data.horarioPreso,
          urinandoNormalmente: data.urinandoNormalmente,
          antiCio: data.antiCio,
          ultimaAplicacao: data.ultimaAplicacao,
          cioRecente: data.cioRecente,
          quandoCruzou: data.quandoCruzou,
          filhoteRecente: data.filhoteRecente,
          idadeFilhote: data.idadeFilhote,
          historicoVeterinario: data.historicoVeterinario,
          tratamentoCirurgico: data.tratamentoCirurgico,
          quandoTratamentoCirurgico: data.quandoTratamentoCirurgico,
          observacoesComportamento: data.observacoesComportamento,
          historicoDoencas: data.historicoDoencas,
          criseEpileptica: data.criseEpileptica,
          desmaios: data.desmaios,
          vermifugado: data.vermifugado,
          veterinario_Id: data.veterinario_Id,
          esterilizacao: data.esterilizacao,
          motivoEsterilizacao: data.motivoEsterilizacao,
          intercorrencia: data.intercorrencia,
          motivoIntercorrencia: data.motivoIntercorrencia,
          tipoCirurgia: data.tipoCirurgia
      });

      this.receita = {
        agendamento_Id: data.agendamento_Id,
        atendimento_Id: data.id,
        animal_Id: data.animal_Id,
        veterinario_Id: data.veterinario_Id,
        tutor_Id: data.tutor_Id,
        tutor: data.tutor,
        animal: data.animal,
        veterinario: data.veterinario,
        agendamento: data.agendamento,
        atendimento: data,
        medicacoes: []
      };
    });
  }

  loadVeterinarios() {
    this.pessoaService.getPessoasByTipoPessoaId(2).subscribe(data => {
      this.veterinarios = data;
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

  onSubmit(): void {
    this.atendimento = {
      ...this.atendimentoForm.value,
      receita: this.receita
    } as Atendimento;

    this.receita = {
      ...this.receita,
      medicacoes: this.medicamentosAdicionados
    };

    this.atendimento.receita = this.receita;
    this.atendimentoService.posOperatorio(this.receita).subscribe(response => {
      this.toastr.success('Pós atendimento atualizado com sucesso!', 'Sucesso');
    });
  }

  cancelar(): void {
    this.medicamentosAdicionados = [];
    this.dataSource.data = this.medicamentosAdicionados;
  }

  displayFn(medicamento: Medicamento): string {
    return medicamento && medicamento.nome ? medicamento.nome : '';
  }

  buscarSenha(event: any) {
    event.preventDefault();

    this.atendimentoService.getObterAtendimentoBySenhaAtendimento(this.senha).subscribe((data) => {
      if (data == null) {
        this.animal = null;
        this.atendimentoForm.patchValue({
          id: '',
          agendamento_Id: '',
          tutor_Id: '',
          animal_Id: '',
          CPF: '',
          nomeCompleto: '',
          telefone: '',
          email: '',
          nome: '',
          ano: '',
          peso: '',
          raca: '',
          sexoId: '',
          chip: '',
          pelagem: '',
          especieId: '',
          senhaAtendimento: '',
          dataAtendimento: '',
          jejum: '',
          ultimaAlimentacao: '',
          ultimaIngestaoLiquidos: '',
          presoDuranteNoite: '',
          soltoDuranteNoite: '',
          horarioPreso: '',
          urinandoNormalmente: '',
          antiCio: '',
          ultimaAplicacao: '',
          cioRecente: '',
          quandoCruzou: '',
          filhoteRecente: '',
          idadeFilhote: '',
          historicoVeterinario: '',
          tratamentoCirurgico: '',
          quandoTratamentoCirurgico: '',
          observacoesComportamento: '',
          historicoDoencas: '',
          criseEpileptica: '',
          desmaios: '',
          vermifugado: '',
          veterinario_Id: '',
          esterilizacao: '',
          motivoEsterilizacao: '',
          intercorrencia: '',
          motivoIntercorrencia: '',
        });

        this.toastr.error('Senha Informada não cadastrada.', 'Erro');
      }
      else {
        this.animal = data.animal;

        this.atendimentoForm.patchValue({
          id: data.id,
          agendamento_Id: data.agendamento_Id,
          tutor_Id: data.tutor_Id,
          animal_Id: data.animal_Id,
          CPF: data.tutor.cpf,
          nomeCompleto: data.tutor.nomeCompleto,
          telefone: data.tutor.telefone,
          email: data.tutor.email,
          nome: data.animal.nome,
          ano: data.animal.ano,
          peso: data.animal.peso,
          raca: data.animal.raca,
          chip: data.animal.chip,
          pelagem: data.animal.pelagem,
          sexoId: data.animal.sexoId,
          especieId: data.animal.especieId,
          senhaAtendimento: this.senha,
          dataAtendimento: data.dataAtendimento,
          jejum: data.jejum,
          ultimaAlimentacao: data.ultimaAlimentacao,
          ultimaIngestaoLiquidos: data.ultimaIngestaoLiquidos,
          presoDuranteNoite: data.presoDuranteNoite,
          soltoDuranteNoite: data.soltoDuranteNoite,
          horarioPreso: data.horarioPreso,
          urinandoNormalmente: data.urinandoNormalmente,
          antiCio: data.antiCio,
          ultimaAplicacao: data.ultimaAplicacao,
          cioRecente: data.cioRecente,
          quandoCruzou: data.quandoCruzou,
          filhoteRecente: data.filhoteRecente,
          idadeFilhote: data.idadeFilhote,
          historicoVeterinario: data.historicoVeterinario,
          tratamentoCirurgico: data.tratamentoCirurgico,
          quandoTratamentoCirurgico: data.quandoTratamentoCirurgico,
          observacoesComportamento: data.observacoesComportamento,
          historicoDoencas: data.historicoDoencas,
          criseEpileptica: data.criseEpileptica,
          desmaios: data.desmaios,
          vermifugado: data.vermifugado,
          veterinario_Id: data.veterinario_Id,
          esterilizacao: data.esterilizacao,
          motivoEsterilizacao: data.motivoEsterilizacao,
          intercorrencia: data.intercorrencia,
          motivoIntercorrencia: data.motivoIntercorrencia,
          tipoCirurgia: data.tipoCirurgia
        });

        this.receita = {
          agendamento_Id: data.agendamento_Id,
          atendimento_Id: data.id,
          animal_Id: data.animal_Id,
          veterinario_Id: data.veterinario_Id,
          tutor_Id: data.tutor_Id,
          tutor: data.tutor,
          animal: data.animal,
          veterinario: data.veterinario,
          agendamento: data.agendamento,
          atendimento: data,
          medicacoes: []
        };

        this.getMedicamentoByPesoAndTipoEspecie(data.animal.peso, data.animal.especieId);
      }
    });
  }

  getMedicamentoByPesoAndTipoEspecie(peso: any, tipoEspecieId: any) {
    this.medicamentoService.getMedicamentoByPesoAndTipoEspecie(peso, tipoEspecieId).subscribe((data) => {
      console.log(data);
    });
  }
}
