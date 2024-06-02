import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resgistrar } from '../interface/registrar';
import {environment} from '../../environments/environments';
import { ResponseApi } from '../interface/resposeAPI';
@Injectable({
  providedIn: 'root'
})
export class ResgistrarService {
    private endpoint:string=environment.endPoint;
    private apiUrl:string =this.endpoint+"/Agencia/";
  constructor(private http: HttpClient) {

  }



  save(request: Resgistrar): Observable<ResponseApi> {
   
    return this.http.post<ResponseApi>(`${this.apiUrl}agregar`, request);
  }

  

  
}
