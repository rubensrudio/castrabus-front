import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtendimentoService } from '../../../services/atendimento.service';
import { ToastrService } from 'ngx-toastr';
import { PessoaService } from '../../../services/pessoa.service';
import { Pessoa } from '../../../models/pessoa.model';
import { Atendimento } from 'src/app/models/atendimento.model';
import { TipoSexo } from 'src/app/models/tipoSexo.model';
import { TipoEspecie } from 'src/app/models/tipoEspecie.model';
import { TipoSexoService } from 'src/app/services/tipoSexo.service';
import { TipoEspecieService } from 'src/app/services/tipoEspecie.service';

@Component({
  selector: 'app-atendimento-form',
  templateUrl: './atendimento-form.component.html',
  styleUrls: ['./atendimento-form.component.scss']
})
export class AtendimentoFormComponent implements OnInit {
  atendimentoForm: FormGroup;
  id!: string;
  isEdit: boolean = false;
  tipoAtendimento: string = '';
  httpModel: any;
  pessoas: Pessoa[] = [];
  tipoSexo: TipoSexo[] = [];
  tipoEspecie: TipoEspecie[] = [];
  senha!: string;
  animal!: any;

  constructor(
    private fb: FormBuilder,
    private atendimentoService: AtendimentoService,
    private pessoaService: PessoaService,
    private tipoSexoService: TipoSexoService,
    private tipoEspecieService: TipoEspecieService,
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
      vermifugado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPessoas();

    this.tipoSexoService.getTipoSexos().subscribe(data => {
      this.httpModel = data;
      this.tipoSexo = this.httpModel.result;
    });

    this.tipoEspecieService.getTipoEspecies().subscribe(data => {
        this.httpModel = data;
        this.tipoEspecie = this.httpModel.result;
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.isEdit = this.route.snapshot.url[1]?.path === 'edit';
      this.tipoAtendimento = this.route.snapshot.url[1]?.path === 'pre-operatorio' ? 'Pré-Operatório' : 'Pós-Operatório';

      this.loadAtendimento();
    });
  }

  loadPessoas(): void {
    this.pessoaService.getPessoas().subscribe(data => {
      this.httpModel = data;
      this.pessoas = this.httpModel.result.filter((p: Pessoa) => p.tipoPessoaId === 2);
    });
  }

  loadAtendimento(): void {
    this.atendimentoService.getObterAtendimentoBySenhaAtendimento(this.id).subscribe((data) => {
      console.log(data)
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
        pelagem: data.animal.pelagem,
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
        vermifugado: data.vermifugado
      });
    });
  }

  onSubmit(): void {
    if (this.atendimentoForm.valid) {
      const formData: Atendimento = this.atendimentoForm.value;
      this.atendimentoService.updateAtendimento(formData).subscribe({
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

  listaAtendimentos() {
    this.router.navigate(['/atendimentos']);
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
}
