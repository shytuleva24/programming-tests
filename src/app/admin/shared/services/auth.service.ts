import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, Subject, tap, throwError} from "rxjs";

import {FbAuthResponse, User} from "../../../shared/interfaces";
import {environment} from "../../../../environments/environment";

@Injectable({providedIn: 'root'})
export class AuthService {
  public error$: Subject<string> = new Subject<string>()

  get token(): string | null{
    const expDateStr = localStorage.getItem('fb-token-exp');
    const expDate = expDateStr ? new Date(expDateStr) : null;

    if (expDate && new Date() > expDate) {
      this.logOut();
      return null;
    }
    return localStorage.getItem('fb-token')
  }
  constructor(private http: HttpClient) { }
  login (user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
        .pipe(
            tap((res: any) => this.setToken(res as FbAuthResponse)),
            catchError(this.handleError.bind(this))
        );
  }
  logOut() {
    this.setToken(null);
  }

  isAuthenticated () : boolean {
    return !!this.token;
  }
  private handleError (error: HttpErrorResponse) {
    const { message } = error.error.error;
    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Введено некорректну електронну пошту');
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Введено некорректний пароль');
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Введений email не існує');
        break
    }
    return throwError(error);
  }
  private setToken(res: FbAuthResponse | null) {
    if (res) {
      const expDate = new Date(new Date().getTime() + +res.expiresIn * 1000);
      localStorage.setItem('fb-token', res.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
