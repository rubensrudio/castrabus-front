import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doenca } from '../models/doenca.model';
import { URL_API_DOENCA } from '../shared/constants/resources-api.constants';

@Injectable({
  providedIn: 'root',
})
export class DoencaService {
    private apiUrl = `${URL_API_DOENCA}`;

  constructor(private http: HttpClient) {}

  getDoencas(): Observable<Doenca[]> {
    return this.http.get<Doenca[]>(`${this.apiUrl}`);
  }

  getDoenca(id: number): Observable<Doenca> {
    return this.http.get<Doenca>(`${this.apiUrl}/${id}`);
  }

  createDoenca(doenca: Doenca): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, doenca);
  }

  updateDoenca(id: number, doenca: Doenca): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, doenca);
  }

  deleteDoenca(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
