import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { setStorage } from '../shared/utils/util'; 

@Component({
  selector: 'app-formulario-pages',
  templateUrl: './formulario-pages.component.html',
  styleUrls: ['./formulario-pages.component.scss']
})
export class FormularioPagesComponent implements OnInit {

  datosPersonalesForm: FormControl;
  datosVehiculoForm: FormControl;
  datosCoberturaForm: FormControl;

  registroFinalizado: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.datosPersonalesForm = new FormControl('', Validators.required);
    this.datosVehiculoForm = new FormControl('', Validators.required);
    this.datosCoberturaForm = new FormControl('', Validators.required);
  }

  loadDatosPersonales(value){
    this.datosPersonalesForm = value ? value : '';

    setStorage('datos-personales', this.datosPersonalesForm);
  }

  loadDatosVehiculo(value){
    this.datosVehiculoForm = value ? value : '';

    setStorage('datos-vehiculo', this.datosVehiculoForm);
  }

  coberturaSelected(value){
    this.datosCoberturaForm = value ? value : '';

    setStorage('datos-cobertura', this.datosCoberturaForm);

    this.registroFinalizado = true;
  }

}
