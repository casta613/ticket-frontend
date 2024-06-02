import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlantillaTicket } from '../interface/plantilla-ticket';
import {environment} from '../../environments/environments';
import { ResponseApi } from '../interface/resposeAPI';
@Injectable({
  providedIn: 'root'
})
export class PlantillaTicketService {
    private endpoint:string=environment.endPoint;
    private apiUrl:string =this.endpoint+"/PlantillaTicket/";
  constructor(private http: HttpClient) {

  }


  get(): Observable<PlantillaTicket[]> {

    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.get<PlantillaTicket[]>(`${this.apiUrl}listar`, { headers })

  }

  save(request: PlantillaTicket): Observable<ResponseApi> {
   
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.post<ResponseApi>(`${this.apiUrl}agregar`, request, { headers });
  }

  edit(request: PlantillaTicket): Observable<ResponseApi> {
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.put<ResponseApi>(`${this.apiUrl}modificar/${request.ID}`, request, { headers });
  }

  
}
