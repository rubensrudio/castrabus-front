declare var google: any;
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import * as crypto from 'crypto-js';
import { Router } from '@angular/router';
import { URL_API_AUTH } from "../shared/constants/resources-api.constants";
import { PermissoesService } from './permissoes.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(this.getUserFromSession());

  router = inject(Router);
  private apiUrl = `${URL_API_AUTH}`;

  constructor(private http: HttpClient, private permissoesService: PermissoesService) {}

  login(email: string, password: string): Observable<any> {
    const hashedPassword = crypto.SHA256(password).toString();
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };

    return this.http.post<any>(this.apiUrl+'/login', { email, password: hashedPassword }, options);
  }

  signInGoogle(payload: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };

    return this.http.post<any>(this.apiUrl+'/GoogleSignIn', {
      email: payload.email,
      name: payload.name ,
      given_name: payload.given_name ,
      family_name: payload.family_name,
      picture: payload.picture }, options);
  }

  signInFacebook(payload: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };

    return this.http.post<any>(this.apiUrl+'/FacebookSignIn', {
      email: payload.email,
      firstName: payload.firstName ,
      lastName: payload.lastName ,
      name: payload.name,
      picture: payload.response.picture.data.url }, options);
  }

  signIn(credential: any, token: string) {
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem("loggedInUser", JSON.stringify(credential));
    //this.permissoesService.setPermissions(JSON.parse(credential).permissions);
    this.userSubject.next(credential);
  }

  getAuthenticate() {
    return sessionStorage.getItem('loggedInUser') === null ? false : true;
  }

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  private getUserFromSession(): any {
    return JSON.parse(sessionStorage.getItem('loggedInUser')!);
  }

  signOut() {
    google.accounts.id.disableAutoSelect();
    sessionStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("authToken");
    this.userSubject.next(null);
    this.router.navigate(['']);
  }
}
