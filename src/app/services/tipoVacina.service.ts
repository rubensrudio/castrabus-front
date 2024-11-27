import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoVacina } from '../models/tipoVacina.model';
import { URL_API_TIPO_VACINA } from '../shared/constants/resources-api.constants';

@Injectable({
  providedIn: 'root',
})
export class TipoVacinaService {
  private apiUrl = `${URL_API_TIPO_VACINA}`;

  constructor(private http: HttpClient) {}

  getTipoVacinas(): Observable<TipoVacina[]> {
    return this.http.get<TipoVacina[]>(`${this.apiUrl}`);
  }

  getTipoVacinaById(id: number): Observable<TipoVacina> {
    return this.http.get<TipoVacina>(`${this.apiUrl}/${id}`);
  }

  createTipoVacina(tipoVacina: TipoVacina): Observable<TipoVacina> {
    return this.http.post<TipoVacina>(`${this.apiUrl}`, tipoVacina);
  }

  updateTipoVacina(id: number, tipoVacina: TipoVacina): Observable<TipoVacina> {
    return this.http.put<TipoVacina>(`${this.apiUrl}/${id}`, tipoVacina);
  }

  deleteTipoVacina(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
