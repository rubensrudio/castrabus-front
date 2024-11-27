import { Animal } from "./animal.model";

export interface Doenca {
    id?: number;
    nomeDoenca: string;
    diagnostico: string;
    tratamento: string;
    animalId: number;
    tutorNome?: string;
    animalNome?: string;
    animal?: Animal;
}
