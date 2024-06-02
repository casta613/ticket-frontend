import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AreaTrabajo } from '../interface/area-trabajo';
import {environment} from '../../environments/environments';
import { ResponseApi } from '../interface/resposeAPI';
@Injectable({
  providedIn: 'root'
})
export class AreaTrabajoService {
    private endpoint:string=environment.endPoint;
    private apiUrl:string =this.endpoint+"/AreaTrabajo/";

    
  constructor(private http: HttpClient) {

  }


  get(): Observable<AreaTrabajo[]> {

    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.get<AreaTrabajo[]>(`${this.apiUrl}listar`, { headers })

  }

  save(request: AreaTrabajo): Observable<ResponseApi> {
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.post<ResponseApi>(`${this.apiUrl}`, request, { headers });
  }

  edit(request: AreaTrabajo): Observable<ResponseApi> {
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.put<ResponseApi>(`${this.apiUrl}modificar/${request.ID}`, request, { headers });
  }

  
}
