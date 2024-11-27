import { Medicamento } from './../models/medicamento.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_API_MEDICAMENTO } from "../shared/constants/resources-api.constants";
import { Animal } from '../models/animal.model';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {
  private apiUrl = `${URL_API_MEDICAMENTO}`;

  constructor(private http: HttpClient) {}

  getMedicamentos(): Observable<{ result: Medicamento[]; hasError: boolean; paginate: any }> {
    return this.http.get<{ result: Medicamento[]; hasError: boolean; paginate: any }>(this.apiUrl);
  }

  getMedicamentoByPesoAndTipoEspecie(peso: number, tipoEspecie: number): Observable<{ result: Medicamento[]; hasError: boolean; paginate: any }> {
    return this.http.get<
      { result: Medicamento[]; hasError: boolean; paginate: any }
    >(`${this.apiUrl}/GetMedicamentoByPesoAndTipoEspecie?peso=${peso}&tipoEspecie=${tipoEspecie}`);
  }

  getMedicamento(id: number): Observable<Medicamento> {
    return this.http.get<Medicamento>(`${this.apiUrl}/${id}`);
  }

  createMedicamento(medicamento: Medicamento): Observable<Medicamento> {
    return this.http.post<Medicamento>(this.apiUrl, medicamento);
  }

  updateMedicamento(id: number, medicamento: Medicamento): Observable<Medicamento> {
    return this.http.put<Medicamento>(`${this.apiUrl}/${id}`, medicamento);
  }

  deleteMedicamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
