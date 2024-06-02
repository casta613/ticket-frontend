import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plantilla } from '../interface/plantilla';
import {environment} from '../../environments/environments';
import { ResponseApi } from '../interface/resposeAPI';
@Injectable({
  providedIn: 'root'
})
export class PlantillaService {
    private endpoint:string=environment.endPoint;
    private apiUrl:string =this.endpoint+"/Plantilla/";
  constructor(private http: HttpClient) {

  }


  get(): Observable<Plantilla[]> {

    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.get<Plantilla[]>(`${this.apiUrl}listar`, { headers })

  }

  save(request: Plantilla): Observable<ResponseApi> {
   
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.post<ResponseApi>(`${this.apiUrl}agregar`, request, { headers });
  }

  edit(request: Plantilla): Observable<ResponseApi> {
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.put<ResponseApi>(`${this.apiUrl}modificar/${request.ID}`, request, { headers });
  }

  
}
