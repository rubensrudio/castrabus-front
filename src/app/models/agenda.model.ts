import { Horario } from "./horario.model";

export interface Agenda {
    data: string;
    horarios: Horario[];
    disponivel: boolean;
    id: number;
  }