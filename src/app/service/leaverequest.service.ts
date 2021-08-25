import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ILeaveRequest } from '../../app/leave-request/Ileave-request';
import { TokenStorageService } from '../services/token-storage.service'


@Injectable({
  providedIn: 'root'
})
export class LeaverequestService {

  baseUrl = 'https://localhost:44335/api/LeaveRequest';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer '+ this.tokenStorage.getToken()
    })
  };

  constructor(private httpClient: HttpClient,private tokenStorage: TokenStorageService) {
  }
  getAllLeaveRequest(empId:string): Observable<ILeaveRequest[]> {
    return this.httpClient.get<ILeaveRequest[]>(this.baseUrl+"?empId="+empId, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }

  // getEmployee(id: number): Observable<ILeaveRequest> {
  //     return this.httpClient.get<ILeaveRequest>(`${this.baseUrl}/${id}`)
  //         .pipe(catchError(this.handleError));
  // }

  addLeaveRequest(leaveRequest: ILeaveRequest): Observable<ILeaveRequest> {
    return this.httpClient.post<ILeaveRequest>(this.baseUrl, leaveRequest, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // updateEmployee(employee: ILeaveRequest): Observable<void> {
  //     return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
  //         headers: new HttpHeaders({
  //             'Content-Type': 'application/json'
  //         })
  //     })
  //         .pipe(catchError(this.handleError));
  // }

  // deleteEmployee(id: number): Observable<void> {
  //     return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
  //         .pipe(catchError(this.handleError));
  // }
}
