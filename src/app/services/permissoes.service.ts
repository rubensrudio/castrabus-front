import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permissao } from '../models/permissao.model';
import { URL_API_PERMISSAO } from "../shared/constants/resources-api.constants";

@Injectable({
  providedIn: 'root'
})
export class PermissoesService {
  private apiUrl = `${URL_API_PERMISSAO}`;
  private permissions: any[] = [];

  constructor(private http: HttpClient) {}

  getPermissoes(): Observable<Permissao[]> {
    return this.http.get<Permissao[]>(this.apiUrl);
  }

  getPermissoesByPerfilId(perfilId: number): Observable<Permissao[]> {
    return this.http.get<Permissao[]>(`${this.apiUrl}/getPermissoesByPerfilId/${perfilId}`);
  }

  getPermissao(id: number): Observable<Permissao> {
    return this.http.get<Permissao>(`${this.apiUrl}/${id}`);
  }

  createPermissoes(permissao: Permissao): Observable<Permissao> {
    return this.http.post<Permissao>(this.apiUrl, permissao);
  }

  updatePermissoes(id: number, permissao: Permissao): Observable<Permissao> {
    return this.http.put<Permissao>(`${this.apiUrl}/${id}`, permissao);
  }

  deletePermissoes(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  setPermissions(permissions: any[]) {
    this.permissions = permissions;
  }

  getModulePermissions(moduloId: number) {
    return this.permissions.find(permission => permission.moduloId === moduloId);
  }

  canInsert(moduloId: number): boolean {
    const modulePermission = this.getModulePermissions(moduloId);
    return modulePermission ? modulePermission.Inserir : false;
  }

  canEdit(moduloId: number): boolean {
    const modulePermission = this.getModulePermissions(moduloId);
    return modulePermission ? modulePermission.editar : false;
  }

  canDelete(moduloId: number): boolean {
    const modulePermission = this.getModulePermissions(moduloId);
    return modulePermission ? modulePermission.excluir : false;
  }

  canView(moduloId: number): boolean {
    const modulePermission = this.getModulePermissions(moduloId);
    return modulePermission ? modulePermission.visualizar : false;
  }
}
