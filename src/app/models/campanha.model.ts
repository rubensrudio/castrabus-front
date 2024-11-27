
import { FaixaHorario } from "./faixaHorario.model";
import { RestricaoMedicamento } from "./restricaoMedicamento.model";

export interface Campanha {
    id?: number;
    nomecampanha: string;
    localcampanha: string;
    estadoId: number;
    cidadeId: number;
    bairroId: number;
    dataInicio: string;
    dataFim: string;
    horaInicio: string;
    horaFim: string;
    horaInicioIntervalo: string;
    horaFimIntervalo: string;
    intervaloAtendimento: number;
    pontuacaoDia: number;

    faixaHorarios: FaixaHorario[];
    restricaoMedicamentos: RestricaoMedicamento[];

    diasAtendimento: {
      domingo: boolean;
      segunda: boolean;
      terca: boolean;
      quarta: boolean;
      quinta: boolean;
      sexta: boolean;
      sabado: boolean;
    };

    restricaoEspecie: {
      canino: {
        manha: boolean;
        tarde: boolean;
      };

      felino: {
        manha: boolean;
        tarde: boolean;
      };
    };
  }
