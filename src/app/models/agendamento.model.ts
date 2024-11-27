import { Agenda } from "./agenda.model";
import { Animal } from "./animal.model";
import { Empresa } from "./empresa.model";
import { Pessoa } from "./pessoa.model";

export interface Agendamento {
  id: number;
  campanhaId: number;
  data: string;
  hora: string;
  pessoaId: number;
  animalId: number;
  empresaId: number;
}
