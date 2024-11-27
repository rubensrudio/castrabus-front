import { Agendamento } from "./agendamento.model";
import { Animal } from "./animal.model";
import { Atendimento } from "./atendimento.model";
import { Medicamento } from "./medicamento.model";
import { Pessoa } from "./pessoa.model";

export interface Receita {
    id?: number;
    agendamento_Id: number;
    atendimento_Id: number;
    animal_Id: number;
    veterinario_Id: number;
    tutor_Id: number;
    tutor: Pessoa;
    animal: Animal;
    veterinario: Pessoa;
    agendamento: Agendamento;
    atendimento: Atendimento;
    medicacoes?: Medicamento[];
  }
  