export interface Pessoa {
  id?: number;
  nomeCompleto: string;
  cpf: string;
  identidade: string;
  telefone: string;
  endereco: string;
  bairroId: number;
  cidadeId: number;
  estadoId: number;
  cep: string;
  email: string;
  dataNascimento: string;
  sexoId: number;
  usuarioId: number;
  tipoPessoaId: number;
  crmv?: string;
}
