import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Login } from '../interface/login';
import {environment} from '../../environments/environments';
import { RespAcceso } from '../interface/respAcceso';
@Injectable({
  providedIn: 'root'
})
export class AccesoService {
    private endpoint:string=environment.endPoint;
    private apiUrl:string =this.endpoint+"/api/Acceso/";
  constructor(private http: HttpClient) {

  }


  post(request: Login): Observable<RespAcceso> {
    console.log('-------');
    console.log(request);
    return this.http.post<RespAcceso>(`${this.apiUrl}acceder`, request).pipe(
      catchError((error: any) => {
        if (error.status === 400) {
        }
        return of(error.error); // Reenvía el error para que lo maneje otro código si es necesario
      })
    );
  }

  getValidation(request: string): Observable<RespAcceso> {

    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    console.log(request);
    return this.http.get<RespAcceso>(`${this.apiUrl}validar/${request}`, { headers }).pipe(
      catchError((error: any) => {
        if (error.status === 400) {
        }
        return of(error.error); // Reenvía el error para que lo maneje otro código si es necesario
      })
    );
  }

  getValidationPermiso(): Observable<[]> {

    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.get<[]>(`${this.apiUrl}validar-permiso`, { headers }).pipe(
      catchError((error: any) => {
        if (error.status === 400) {
        }
        return of(error.error); // Reenvía el error para que lo maneje otro código si es necesario
      })
    );
  }


  
}
