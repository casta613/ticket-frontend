import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from '../interface/estado';
import { Prioridad } from '../interface/prioridad';
import {environment} from '../../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class AtributosService {
    private endpoint:string=environment.endPoint;
    private apiUrl:string =this.endpoint+"/Atributos/";
  constructor(private http: HttpClient) {

  }

  getEstado(): Observable<Estado[]> {

    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.get<Estado[]>(`${this.apiUrl}estados`, { headers })

  }
  getPrioridad(): Observable<Prioridad[]> {

    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.get<Prioridad[]>(`${this.apiUrl}prioridad`, { headers })

  }
  

  
}
