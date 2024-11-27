import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoDoenca } from '../models/tipoDoenca.model';
import { URL_API_TIPO_DOENCA } from '../shared/constants/resources-api.constants';

@Injectable({
  providedIn: 'root',
})
export class TipoDoencaService {
    private apiUrl = `${URL_API_TIPO_DOENCA}`;

  constructor(private http: HttpClient) {}

  getTipoDoencas(): Observable<TipoDoenca[]> {
    return this.http.get<TipoDoenca[]>(`${this.apiUrl}`);
  }

  getTipoDoenca(id: number): Observable<TipoDoenca> {
    return this.http.get<TipoDoenca>(`${this.apiUrl}/${id}`);
  }

  createTipoDoenca(tipoDoenca: TipoDoenca): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, tipoDoenca);
  }

  updateTipoDoenca(id: number, tipoDoenca: TipoDoenca): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, tipoDoenca);
  }

  deleteTipoDoenca(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
