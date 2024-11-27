import { Receita } from "./receita.model";

export interface Atendimento {
    id?: number;
    statusAtendimento: string;
    tipoCirurgia: string;
    receita?: Receita;
    tutor?: string;
    animal?: string;
    doencas?: any[];
    vacinas?: any[];
    senhaAtendimento: string,
    agendamento_Id: number,
    veterinario_Id: number,
    tutor_Id: number,
    animal_Id: number,
    dataAtendimento: string,
    antiCio: boolean,
    cioRecente: boolean,
    criseEpileptica: boolean,
    desmaios: boolean,
    filhoteRecente: boolean,
    historicoDoencas: boolean,
    historicoVeterinario: boolean,
    horarioPreso?: string,
    idadeFilhote?: number,
    jejum: boolean,
    observacoesComportamento: string,
    presoDuranteNoite: boolean,
    quandoCruzou?: string,
    quandoTratamentoCirurgico?: string,
    soltoDuranteNoite: boolean,
    tratamentoCirurgico: boolean,
    ultimaAlimentacao: string,
    ultimaAplicacao?: string,
    ultimaIngestaoLiquidos: string,
    urinandoNormalmente: boolean,
    vermifugado: boolean,
    esterilizacao: boolean,
    motivoEsterilizacao: string,
    intercorrencia: boolean,
    motivoIntercorrencia: string,
  }
  