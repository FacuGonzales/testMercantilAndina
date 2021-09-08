import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioDataService {

  constructor(public http: HttpClient) { }

  getUsuarioValid(usuario: string, ): Observable<any>{
    let url = `https://servicios.qamercantilandina.com.ar/api_mock_frontend/v1/usuarios?nombre=${usuario}`;

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(url, {headers: headers});
  }
  
}
