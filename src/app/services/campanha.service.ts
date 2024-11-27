import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_API_CAMPANHA } from "../shared/constants/resources-api.constants";
import { HttpModel } from '../models/http.model';

@Injectable({
  providedIn: 'root'
})
export class CampanhaService {
  private apiUrl = `${URL_API_CAMPANHA}`;

  constructor(private http: HttpClient) {}

  getCampanhas(): Observable<HttpModel[]> {
    return this.http.get<HttpModel[]>(this.apiUrl);
  }

  getCampanhasValidas(): Observable<HttpModel[]> {
    return this.http.get<HttpModel[]>(`${this.apiUrl}/GetCampanhasValidas`);
  }

  getCampanha(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createCampanha(campanha: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, campanha);
  }

  updateCampanha(id: number, campanha: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, campanha);
  }

  deleteCampanha(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
