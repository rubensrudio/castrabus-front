export interface Contratante {
    id?: number;
    nome: string;
    cnpj: string;
    telefone: string;
    endereco: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    email: string;
    arquivos?: File[];
}
