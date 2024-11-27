import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_API_AGENDAMENTO } from "../shared/constants/resources-api.constants";
import { Agendamento } from '../models/agendamento.model';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private apiUrl = `${URL_API_AGENDAMENTO}`;

  constructor(private http: HttpClient) {}

  getAgendamentos(campanhaId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAgendaCampanha/${campanhaId}`);
  }

  getAllAgendamentos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getAllMyAgendamentos(pessoaId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAllMyAgendamentos/${pessoaId}`);
  }

  getAgendamento(id: number): Observable<Agendamento> {
    return this.http.get<Agendamento>(`${this.apiUrl}/${id}`);
  }

  createAgendamento(empresa: Agendamento): Observable<Agendamento> {
    return this.http.post<any>(this.apiUrl, empresa);
  }

  updateAgendamento(id: number, empresa: Agendamento): Observable<Agendamento> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, empresa);
  }

  deleteAgendamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  verificarAgendamento(animalId: number, campanhaId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verificarAgendamento?animalId=${animalId}&campanhaId=${campanhaId}`);
  }

  getAgendamentosFiltered(filtros: any): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.apiUrl}/getAgendamentosFiltered`, { params: filtros });
  }

  gerarSenha(agendamentoId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GerarSenha/${agendamentoId}`, {});
  }

  getAgendamentosFila(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.apiUrl}/getAgendamentosFiltered`, {});
  }
}
