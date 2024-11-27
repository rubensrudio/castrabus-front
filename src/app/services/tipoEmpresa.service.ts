import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_API_TIPO_EMPRESA } from "../shared/constants/resources-api.constants";
import { TipoEmpresa } from '../models/tipoEmpresa.model';
import { HttpModel } from '../models/http.model';

@Injectable({
  providedIn: 'root'
})
export class TipoEmpresaService {
  private apiUrl = `${URL_API_TIPO_EMPRESA}`;

  constructor(private http: HttpClient) { }

  getTipoEmpresas(): Observable<HttpModel[]> {
    return this.http.get<HttpModel[]>(this.apiUrl);
  }

  getTipoEmpresa(id: number): Observable<TipoEmpresa> {
    return this.http.get<TipoEmpresa>(`${this.apiUrl}/${id}`);
  }

  createTipoEmpresa(tipoEmpresa: TipoEmpresa): Observable<TipoEmpresa> {
    return this.http.post<TipoEmpresa>(this.apiUrl, tipoEmpresa);
  }

  updateTipoEmpresa(id: number, tipoEmpresa: TipoEmpresa): Observable<TipoEmpresa> {
    return this.http.put<TipoEmpresa>(`${this.apiUrl}/${id}`, tipoEmpresa);
  }

  deleteTipoEmpresa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
