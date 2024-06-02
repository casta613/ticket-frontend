import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Encargado } from '../interface/encargado';
import {environment} from '../../environments/environments';
import { ResponseApi } from '../interface/resposeAPI';
@Injectable({
  providedIn: 'root'
})
export class EncargadoService {
    private endpoint:string=environment.endPoint;
    private apiUrl:string =this.endpoint+"/Responsable/";
  constructor(private http: HttpClient) {

  }


  get(): Observable<Encargado[]> {

    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.get<Encargado[]>(`${this.apiUrl}listar`, { headers })

  }

  save(request: Encargado): Observable<ResponseApi> {
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.post<ResponseApi>(`${this.apiUrl}agregar`, request,{ headers });
  }

  edit(request: Encargado): Observable<ResponseApi> {
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.put<ResponseApi>(`${this.apiUrl}modificar/${request.ID}`, request,{ headers });
  }

  
}
