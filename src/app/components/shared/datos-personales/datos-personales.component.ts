import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IEntidadModel } from '../../models/entidad-model';
import { IProvinciasModel } from '../../models/pronvincias-model';
import { GeoRefDataService } from '../../services/geo-ref-data.service';
import { UsuarioDataService } from '../../services/usuario-data.service';
import { alphaOrder } from '../utils/util';

@Component({
  selector: 'datos-personales-component',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss']
})
export class DatosPersonalesComponent implements OnInit {

  loading: boolean = false;
  registroOk: boolean = false;

  // variable que me permite modificar el color del boton de Enviar
  disabledEnviar: boolean = false;
  colorEnviar: string = 'primary';
  
  // Contiene el formulario de los datos personales
  datosPersonalesForm: FormGroup;

  // variable para limitar la fecha actual.
  fechaActual: Date = new Date();

  // Variables para controlar que las password sea valida
  regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@#$%^&+=!_*-]{8,14}$/;
  regPassValid: boolean;
  passwordValid: boolean;
  minLenghtPass: boolean;

  // Contiene el lsitado de pronvincias
  listadoProvincias: IProvinciasModel[] = [];

  // Contiene el listado de ciudades por provincias
  listadoCiudades: IEntidadModel[] = [];

  @Output() datosPersonalesLoad = new EventEmitter<any>();
  
  constructor(private geoRef: GeoRefDataService, 
              private usuarioData : UsuarioDataService,
              private fb: FormBuilder,
              private alert: ToastrService) { }

  ngOnInit(): void {
    this.formInit();
    this.obtenerProvincias();
    this.formSubscribe();

    // if(this.datosPersonalesForm.value) {
    //   this.disabledEditar = false;
    //   this.colorEditar = 'primary'
    // }
  }

  
  formInit(){
    this.datosPersonalesForm = this.fb.group({
      apellido: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15)])],
      nombre: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15)])],
      dni: ['', Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(8)])],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10)])],
      telefono: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10)])],
      domicilio: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      usuario: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      password: ['', [Validators.required]],
    });

    this.datosPersonalesForm.get('ciudad').disable();
  }

  formSubscribe(){
    this.datosPersonalesForm.valueChanges.subscribe( p => {
      this.disabledEnviar = false; 
      this.colorEnviar = 'primary';
      this.registroOk = false;
    });

    this.datosPersonalesForm.get('provincia').valueChanges.subscribe( p => this.obtenerCiudades(p));
  }

  get formControl(){
    return this.datosPersonalesForm.controls;
  }

  soloNumeros(_evnt, numeros){
    _evnt = _evnt ? _evnt : window.event;

    let charCode = _evnt.which ? _evnt.which : _evnt.keyCode;
    
    if(numeros){
      if(charCode >= 48 && charCode <=57) return true;
      return false;

    }else{
      if(charCode == 46 || (charCode >= 48 && charCode <=57)) return true;
      return false;
    }
  }

  validarPassword(value){
    this.regPassValid = this.regPass.test(value)

    if(value.length >= 8){
      this.passwordValid = true;
      this.minLenghtPass = true
    }else{
      this.passwordValid = false;
      this.minLenghtPass = false
    }
  }

  obtenerProvincias(){
    this.geoRef.obtenerProvincias().subscribe(
      p => {
        if(p){
          this.listadoProvincias = p.provincias;

          this.listadoProvincias.sort( (a,b)=> alphaOrder(a.nombre, b.nombre));
        }else{
          this.alert.error('Error al obtener las pronvincias.')
        }
      }
    );
  }

  obtenerCiudades(value:number){
    this.geoRef.obtenerCiudades(value).subscribe(
      r => {
        if(r){
          this.datosPersonalesForm.get('ciudad').enable();
          this.listadoCiudades = r.municipios;
          this.listadoCiudades.sort( (a,b)=> alphaOrder(a.nombre, b.nombre));
        }
      }
    );
  }


  guardar(){
    if(this.datosPersonalesForm.valid){
      if(this.datosPersonalesForm.get('fechaNacimiento').value){
        let fechaSelected: Date = new Date(this.datosPersonalesForm.get('fechaNacimiento').value);
        let anioMinimo = this.fechaActual.getFullYear() - 99;
        let anioMaximo = this.fechaActual.getFullYear() - 18; 

        if(fechaSelected.getFullYear() < anioMinimo) return this.alert.error('La edad no puede superar los 99 años.');

        if(fechaSelected.getFullYear() > anioMaximo) return this.alert.error('Debes ser mayor de 18 años para continuar.')
      }
      
      this.usuarioData.getUsuarioValid(this.datosPersonalesForm.get('usuario').value).subscribe(
        r => {
          if(r){
            this.loading = false;
            this.datosPersonalesForm.get('usuario').setValue('');
            this.datosPersonalesForm.get('usuario').markAllAsTouched();

            this.alert.error('El nombre de usuario elegido, ya se encuentra en uso. Por favor ingrese otro.');
            return;
          }

          this.datosPersonalesLoad.emit(this.datosPersonalesForm.value);
          
          localStorage.setItem('datos-personales', JSON.stringify(this.datosPersonalesForm.value));
          
          this.alert.success('Se creo correctamente ');
          this.disabledEnviar = true;
          this.colorEnviar = '';
          this.registroOk = true;
        }
      )

    }else{
      this.datosPersonalesForm.updateValueAndValidity();
      this.datosPersonalesForm.markAllAsTouched();
      this.alert.error('El formulario posee campos invalidos.')
    }
  }
  
}
