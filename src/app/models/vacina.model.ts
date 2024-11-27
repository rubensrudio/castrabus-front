import { Animal } from './animal.model';

export interface Vacina {
    id?: number;
    nome: string;
    dataVacinacao: String;
    dataProximaVacinacao?: String;
    observacao?: string;
    animalId: number;
    tutorNome?: string;
    animalNome?: string;
    tipoVacinaId?: number;
    tipoVacina?: string;
    animal?: Animal;
}
