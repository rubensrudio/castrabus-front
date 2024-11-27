export interface Permissao {
    id?: number;
    moduloId: number;
    nome?: string;
    inserir: boolean;
    editar: boolean;
    excluir: boolean;
    visualizar: boolean;
  }