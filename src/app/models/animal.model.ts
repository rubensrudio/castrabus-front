import { Pessoa } from "./pessoa.model";

export interface Animal {
    id: number;
    nome: string;
    ano?: number;
    meses?: number;
    peso: number;
    chip?: string;
    raca?: string;
    pelagem?: string;
    sexoId: number;
    especieId: number;
    pessoaId: number;
    pessoa?: Pessoa
}
