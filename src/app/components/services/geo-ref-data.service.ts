import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoRefDataService {

  constructor(public http: HttpClient) { }

  obtenerProvincias(): Observable<any>{
    let url = `https://apis.datos.gob.ar/georef/api/provincias`;

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(url, {headers: headers});
  }

  obtenerCiudades(idProvincia: number, ): Observable<any>{
    let url = `https://apis.datos.gob.ar/georef/api/municipios?provincia=${idProvincia}&campos=id,nombre`;

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(url, {headers: headers});
  }
  
}
