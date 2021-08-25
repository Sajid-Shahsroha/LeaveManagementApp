import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ILoginRequest } from '../../app/account/IloginRequest';

const AUTH_API = 'https://localhost:44335/api/Authenticate/';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  constructor(private http: HttpClient) { }

  // login(credentials:ILoginRequest): Observable<ILoginRequest> {
  //   return this.http.post(AUTH_API + 'login', {
  //     username: credentials.username,
  //     password: credentials.password
  //   }, this.httpOptions)
  //   .pipe(catchError(this.handleError))
  // }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(AUTH_API + 'login', {
          username: credentials.username,
          password: credentials.password
        }, this.httpOptions)
      .pipe(catchError(this.handleError));
  }


  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }

  register(user: any): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      username: user.username,
      email: user.email,
      password: user.password
    }, this.httpOptions)
    .pipe(catchError(this.handleError));
  }
}