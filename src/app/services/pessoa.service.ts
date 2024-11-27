import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa.model';
import { URL_API_PESSOA } from "../shared/constants/resources-api.constants";

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private apiUrl = `${URL_API_PESSOA}`;

  constructor(private http: HttpClient) {}

  getPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.apiUrl);
  }

  getPessoasByTipoPessoaId(id: number): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.apiUrl}/GetPessoasByTipoPessoaId/${id}`);
  }

  getPessoa(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.apiUrl}/${id}`);
  }

  getPessoaByCpf(cpf: string): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.apiUrl}/getCPF/${cpf}`);
  }

  createPessoa(pessoa: Pessoa): Observable<any> {
    return this.http.post(`${this.apiUrl}`, pessoa);
  }
  
  updatePessoa(id: number, pessoa: Pessoa): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, pessoa);
  }

  deletePessoa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
