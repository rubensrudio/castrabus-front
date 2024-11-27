import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_API_IBGE } from "../shared/constants/resources-api.constants";

@Injectable({
  providedIn: 'root'
})
export class IbgeService {
  private apiUrl = `${URL_API_IBGE}`;

  constructor(private http: HttpClient) {}

  getEstados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getEstados`);
  }

  getCidadesByEstadoId(estadoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getCidadesByEstado/${estadoId}`);
  }

  getBairrosByCidadeId(cidadeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getBairrosByCidade/${cidadeId}`);
  }

  getEstadoById(idEstado: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getEstadoById/${idEstado}`);
  }

  getCidadeById(cidadeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getCidadesById/${cidadeId}`);
  }

  getBairrosById(bairroId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getBairrosById/${bairroId}`);
  }
}
