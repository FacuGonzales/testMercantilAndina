import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoberturaDataService {

  constructor(public http: HttpClient) { }

  getCoberturas(): Observable<any>{
    let url = `https://servicios.qamercantilandina.com.ar/api_mock_frontend/v1/coberturas`

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(url, {headers: headers});
  }
  
}
