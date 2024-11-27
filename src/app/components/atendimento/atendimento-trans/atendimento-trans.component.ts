import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pessoa } from 'src/app/models/pessoa.model';
import { AtendimentoService } from 'src/app/services/atendimento.service';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-atendimento-trans',
  templateUrl: './atendimento-trans.component.html',
  styleUrl: './atendimento-trans.component.scss'
})
export class AtendimentoTransComponent implements OnInit {
  id!: string;
  senha!: string;
  httpModel: any;
  isEdit: boolean = false;
  atendimentoForm: FormGroup;
  veterinarios: Pessoa[] = [];
  animal!: any;

  constructor(
    private fb: FormBuilder,
    private atendimentoService: AtendimentoService,
    private pessoaService: PessoaService,
    private route: ActivatedRoute,
    private router: Router,
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
      sexoId: ['', Validators.required],
      chip: ['', Validators.required],
      pelagem: ['', Validators.required],
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
      this.isEdit = this.route.snapshot.url[1]?.path === 'edit';
      this.loadVeterinarios();

      if (typeof this.id !== 'undefined') {
        this.senha = this.id;
        this.loadAtendimento();
      }
    });
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
          sexoId: data.animal.sexoId,
          chip: data.animal.chip,
          pelagem: data.animal.pelagem,
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
      }
    });
  }

  loadVeterinarios() {
    this.pessoaService.getPessoasByTipoPessoaId(2).subscribe(data => {
      this.veterinarios = data;
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
          sexoId: data.animal.sexoId,
          chip: data.animal.chip,
          pelagem: data.animal.pelagem,
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
    });
  }

  onSubmit(): void {
    if (this.atendimentoForm.valid) {
      const formData = this.atendimentoForm.value;
      this.atendimentoService.transOperatorio(formData).subscribe({
        next: () => {
          this.toastr.success('Atendimento atualizado com sucesso!', 'Sucesso');
          this.router.navigate(['/atendimentos']);
        },
        error: () => {
          this.toastr.error('Erro ao atualizar o atendimento.', 'Erro');
        }
      });
    }
  }
}
