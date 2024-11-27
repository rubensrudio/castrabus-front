// src/app/services/usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioVm } from '../models/usuario.model';
import { HttpModel } from '../models/http.model';
import { URL_API_USUARIO } from "../shared/constants/resources-api.constants";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${URL_API_USUARIO}`;

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<HttpModel[]> {
    return this.http.get<HttpModel[]>(this.apiUrl);
  }

  getUsuario(id: number): Observable<UsuarioVm> {
    return this.http.get<UsuarioVm>(`${this.apiUrl}/${id}`);
  }

  createUsuario(usuario: UsuarioVm): Observable<UsuarioVm> {
    return this.http.post<UsuarioVm>(this.apiUrl, usuario);
  }

  updateUsuario(id: number, usuario: UsuarioVm): Observable<UsuarioVm> {
    return this.http.put<UsuarioVm>(`${this.apiUrl}/${id}`, usuario);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
