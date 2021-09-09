import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculoDataService {

  constructor(public http: HttpClient) { }

  getInfoVehiculos( codigoMarca?: number, anio?: number, version?: string ): Observable<any>{
    // obtenerMarcas
    let url = `https://servicios.qamercantilandina.com.ar/api/v1/vehiculos/marcas`

    // obtenerModelos
    if(codigoMarca && anio) url = `https://servicios.qamercantilandina.com.ar/api/v1/vehiculos/marcas/${codigoMarca}/${anio}`;

    // obtenerVersiones
    if(codigoMarca && anio && version) url = `https://servicios.qamercantilandina.com.ar/api/v1/vehiculos/marcas/${codigoMarca}/${anio}/${version}`;

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(url, {headers: headers});
  }
  
}