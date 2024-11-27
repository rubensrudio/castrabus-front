import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vacina } from '../models/vacina.model';
import { URL_API_VACINA } from '../shared/constants/resources-api.constants';

@Injectable({
  providedIn: 'root',
})
export class VacinaService {
  private apiUrl = `${URL_API_VACINA}`;

  constructor(private http: HttpClient) {}

  getVacinas(): Observable<Vacina[]> {
    return this.http.get<Vacina[]>(`${this.apiUrl}`);
  }

  getVacinaById(id: number): Observable<Vacina> {
    return this.http.get<Vacina>(`${this.apiUrl}/${id}`);
  }

  getVacinasByAnimalId(animalId: number): Observable<Vacina[]> {
    return this.http.get<Vacina[]>(`${this.apiUrl}/getVacinasByAnimalId/${animalId}`);
  }

  createVacina(vacina: Vacina): Observable<Vacina> {
    return this.http.post<Vacina>(`${this.apiUrl}`, vacina);
  }

  updateVacina(id: number, vacina: Vacina): Observable<Vacina> {
    return this.http.put<Vacina>(`${this.apiUrl}/${id}`, vacina);
  }

  deleteVacina(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
