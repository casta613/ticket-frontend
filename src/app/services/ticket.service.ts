import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../interface/ticket';
import { TicketRegistro } from '../interface/ticket-registro';
import {environment} from '../../environments/environments';
import { ResponseApi } from '../interface/resposeAPI';
@Injectable({
  providedIn: 'root'
})
export class TicketService {
    private endpoint:string=environment.endPoint;
    private apiUrl:string =this.endpoint+"/Ticket/";
  constructor(private http: HttpClient) {

  }


  get(): Observable<Ticket[]> {

    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.get<Ticket[]>(`${this.apiUrl}listar`, { headers })

  }

  
  save(request: Ticket): Observable<ResponseApi> {
   
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.post<ResponseApi>(`${this.apiUrl}agregar`, request, { headers });
  }

  edit(request: Ticket): Observable<ResponseApi> {
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.put<ResponseApi>(`${this.apiUrl}modificar/${request.ID}`, request, { headers });
  }

  saveLog(request: TicketRegistro): Observable<ResponseApi> {
   
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.post<ResponseApi>(`${this.apiUrl}agregar-registro`, request, { headers });
  }

  getLog(ticket:number): Observable<TicketRegistro[]> {

    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.get<TicketRegistro[]>(`${this.apiUrl}registro/${ticket}`, { headers })

  }

  
}
