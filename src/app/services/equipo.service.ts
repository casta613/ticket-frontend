import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipo } from '../interface/equipo';
import {environment} from '../../environments/environments';
import { ResponseApi } from '../interface/resposeAPI';
@Injectable({
  providedIn: 'root'
})
export class EquipoService {
    private endpoint:string=environment.endPoint;
    private apiUrl:string =this.endpoint+"/Equipo/";
  constructor(private http: HttpClient) {

  }


  get(): Observable<Equipo[]> {

    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.get<Equipo[]>(`${this.apiUrl}listar`, { headers })

  }

  save(request: Equipo): Observable<ResponseApi> {
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.post<ResponseApi>(`${this.apiUrl}agregar`, request, { headers });
  }

  edit(request: Equipo): Observable<ResponseApi> {
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.put<ResponseApi>(`${this.apiUrl}modificar/${request.ID}`, request, { headers });
  }

  
}
