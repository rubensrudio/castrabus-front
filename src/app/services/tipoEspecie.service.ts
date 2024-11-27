import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoEspecie } from '../models/tipoEspecie.model';
import { HttpModel } from '../models/http.model';
import { URL_API_TIPO_ESPECIE } from "../shared/constants/resources-api.constants";

@Injectable({
  providedIn: 'root'
})
export class TipoEspecieService {
  private apiUrl = `${URL_API_TIPO_ESPECIE}`;

  constructor(private http: HttpClient) {}

  getTipoEspecies(): Observable<HttpModel[]> {
    return this.http.get<HttpModel[]>(this.apiUrl);
  }

  getTipoEspecie(id: number): Observable<TipoEspecie> {
    return this.http.get<TipoEspecie>(`${this.apiUrl}/${id}`);
  }

  createTipoEspecie(pessoa: TipoEspecie): Observable<TipoEspecie> {
    return this.http.post<TipoEspecie>(this.apiUrl, pessoa);
  }

  updateTipoEspecie(id: number, pessoa: TipoEspecie): Observable<TipoEspecie> {
    return this.http.put<TipoEspecie>(`${this.apiUrl}/${id}`, pessoa);
  }

  deleteTipoEspecie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
