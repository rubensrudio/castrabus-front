// src/app/services/perfil.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfil } from '../models/perfil.model';
import { URL_API_PERFIL } from "../shared/constants/resources-api.constants";

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = `${URL_API_PERFIL}`;

  constructor(private http: HttpClient) {}

  getPerfis(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(this.apiUrl);
  }

  getPerfisById(empresaId: number): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(`${this.apiUrl}/getPerfilByEmpresa/${empresaId}`);
  }

  getPerfil(id: number): Observable<Perfil> {
    return this.http.get<Perfil>(`${this.apiUrl}/${id}`);
  }

  createPerfil(perfil: Perfil): Observable<Perfil> {
    return this.http.post<Perfil>(this.apiUrl, perfil);
  }

  updatePerfil(id: number, perfil: Perfil): Observable<Perfil> {
    return this.http.put<Perfil>(`${this.apiUrl}/${id}`, perfil);
  }

  deletePerfil(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
