import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contratante } from '../models/contratante.model';
import { URL_API_CONTRATANTE } from '../shared/constants/resources-api.constants';

@Injectable({
  providedIn: 'root'
})
export class ContratanteService {
  private apiUrl = `${URL_API_CONTRATANTE}`;

  constructor(private http: HttpClient) { }

  getContratantes(): Observable<Contratante[]> {
    return this.http.get<Contratante[]>(`${this.apiUrl}`);
  }

  getContratante(id: number): Observable<Contratante> {
    return this.http.get<Contratante>(`${this.apiUrl}/${id}`);
  }

  createContratante(formData: FormData): Observable<Contratante> {
    return this.http.post<Contratante>(`${this.apiUrl}`, formData);
  }

  updateContratante(id: number, formData: FormData): Observable<Contratante> {
    return this.http.put<Contratante>(`${this.apiUrl}/${id}`, formData);
  }

  deleteContratante(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
