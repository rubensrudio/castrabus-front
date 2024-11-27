import { Permissao } from "./permissao.model";

export interface Perfil {
    id: number;
    nome: string;
    role: string;
    permissoes: Permissao[];
}
