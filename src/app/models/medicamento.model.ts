import { Recomendacao } from "./recomendacao.model";

export interface Medicamento {
  id?: number;
  nome: string;
  capsulaComprimido: string;
  dosagem: number;
  unidadeMedida: string;
  tipoEspecie_Id: number;

  recomendacoes?: Recomendacao[];
}
