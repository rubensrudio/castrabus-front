// src/app/services/empresa.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Empresa } from '../models/empresa.model';
import { HttpModel } from '../models/http.model';
import { URL_API_EMPRESA } from "../shared/constants/resources-api.constants";

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = `${URL_API_EMPRESA}`;

  constructor(private http: HttpClient) {}

  getEmpresas(): Observable<HttpModel[]> {
    return this.http.get<HttpModel[]>(this.apiUrl);
  }

  getEmpresa(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.apiUrl}/${id}`);
  }

  createEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.post<any>(this.apiUrl, empresa);
  }

  updateEmpresa(id: number, empresa: Empresa): Observable<Empresa> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, empresa);
  }

  deleteEmpresa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
