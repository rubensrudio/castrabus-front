import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Modulo } from '../models/modulo.model';
import { URL_API_MODULO } from "../shared/constants/resources-api.constants";

@Injectable({
  providedIn: 'root'
})
export class ModuloService {
  private apiUrl = `${URL_API_MODULO}`;

  constructor(private http: HttpClient) {}

  getModulos(): Observable<{ resultType: number, result: Modulo[] }> {
    return this.http.get<{ resultType: number, result: Modulo[] }>(this.apiUrl);
  }

  getModulo(id: number): Observable<Modulo> {
    return this.http.get<Modulo>(`${this.apiUrl}/${id}`);
  }

  createModulo(modulo: Modulo): Observable<Modulo> {
    return this.http.post<Modulo>(this.apiUrl, modulo);
  }

  updateModulo(id: number, modulo: Modulo): Observable<Modulo> {
    return this.http.put<Modulo>(`${this.apiUrl}/${id}`, modulo);
  }

  deleteModulo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
