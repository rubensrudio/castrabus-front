import { Receita } from './../models/receita.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atendimento } from '../models/atendimento.model';
import { URL_API_ATENDIMENTO } from '../shared/constants/resources-api.constants';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {
    private apiUrl = `${URL_API_ATENDIMENTO}`;

  constructor(private http: HttpClient) {}

  getAtendimentoById(agendamentoId: number): Observable<Atendimento> {
    return this.http.get<Atendimento>(`${this.apiUrl}/${agendamentoId}`);
  }

  getObterAtendimentoBySenhaAtendimento(senhaAtendimendo: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetObterAtendimentoBySenhaAtendimento/${senhaAtendimendo}`);
  }

  updateAtendimento(atendimento: Atendimento): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${atendimento.id}`, atendimento);
  }

  preOperatorio(atendimento: Atendimento): Observable<Atendimento> {
    return this.http.post<Atendimento>(`${this.apiUrl}/PreOperatorio`, atendimento);
  }

  transOperatorio(atendimento: Atendimento): Observable<Atendimento> {
    return this.http.post<Atendimento>(`${this.apiUrl}/TransOperatorio`, atendimento);
  }

  posOperatorio(receita: Receita): Observable<Receita> {
    return this.http.post<Receita>(`${this.apiUrl}/PosOperatorio`, receita);
  }
}
