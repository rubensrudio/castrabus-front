import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoSexo } from '../models/tipoSexo.model';
import { HttpModel } from '../models/http.model';
import { URL_API_TIPO_SEXO } from "../shared/constants/resources-api.constants";

@Injectable({
  providedIn: 'root'
})
export class TipoSexoService {
  private apiUrl = `${URL_API_TIPO_SEXO}`;

  constructor(private http: HttpClient) {}

  getTipoSexos(): Observable<HttpModel[]> {
    return this.http.get<HttpModel[]>(this.apiUrl);
  }

  getTipoSexo(id: number): Observable<TipoSexo> {
    return this.http.get<TipoSexo>(`${this.apiUrl}/${id}`);
  }

  createTipoSexo(pessoa: TipoSexo): Observable<TipoSexo> {
    return this.http.post<TipoSexo>(this.apiUrl, pessoa);
  }

  updateTipoSexo(id: number, pessoa: TipoSexo): Observable<TipoSexo> {
    return this.http.put<TipoSexo>(`${this.apiUrl}/${id}`, pessoa);
  }

  deleteTipoSexo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
