import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ICoberturaModel } from '../../models/cobertura-model';
import { IDatosPersonalesModel } from '../../models/datos-personales-model';
import { IDatosVehiculoModel } from '../../models/datos-vehiculo-model';

@Component({
  selector: 'resumen-component',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit {

  datosPersonales: IDatosPersonalesModel;
  datosVehiculo: IDatosVehiculoModel;
  datosCobertura: ICoberturaModel;

  @Input() registroFinalizado: boolean;

  constructor(private alert: ToastrService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(changes.registroFinalizado && this.registroFinalizado){
      this.getDatosPersonales();
      this.getDatosVehiculo();
      this.getDatosCobertura();
    }
  }

  getDatosPersonales(){
    let _localStorage = JSON.parse(localStorage.getItem('datos-personales'));
    this.datosPersonales = _localStorage;
  }

  getDatosVehiculo(){
    let _localStorage = JSON.parse(localStorage.getItem('datos-vehiculo'));
    this.datosVehiculo = _localStorage;
  }

  getDatosCobertura(){
    let _localStorage = JSON.parse(localStorage.getItem('datos-cobertura'));
    this.datosCobertura = _localStorage;
  }
  
  
  guardar(){
    this.alert.success('Registro realizado con exito!.');
  }

}
