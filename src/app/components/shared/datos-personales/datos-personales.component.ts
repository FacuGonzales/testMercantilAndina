import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IDatosPersonalesModel } from '../../models/datos-personales-model';
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
export class DatosPersonalesComponent implements OnInit, OnDestroy {

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
  
  subscribes: Subscription[] = [];

  constructor(private geoRef: GeoRefDataService, 
              private usuarioData : UsuarioDataService,
              private fb: FormBuilder,
              private alert: ToastrService) { }

  ngOnInit(): void {
    this.formInit();
    this.obtenerProvincias();
    this.formSubscribe();
  }

  ngOnDestroy(): void{
    this.subscribes.forEach(s => s.unsubscribe());
  }

  formInit(){
    this.datosPersonalesForm = this.fb.group({
      apellido: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(15)])],
      nombre: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(15)])],
      dni: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.minLength(7), Validators.maxLength(8)])],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.compose([Validators.pattern(/^[0-9]\d*$/), Validators.minLength(10), Validators.maxLength(10)])],
      telefono: ['', Validators.compose([Validators.pattern(/^[0-9]\d*$/), Validators.minLength(10), Validators.maxLength(10)])],
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
    this.subscribes[0] = this.datosPersonalesForm.valueChanges.subscribe( p => {
      this.disabledEnviar = false; 
      this.colorEnviar = 'primary';
      this.registroOk = false;
    });

    this.subscribes[1] = this.datosPersonalesForm.get('provincia').valueChanges.subscribe( p => this.obtenerCiudades(p));
  }

  get formControl(){
    return this.datosPersonalesForm.controls;
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
    this.subscribes[2] = this.geoRef.obtenerProvincias().subscribe(
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
    this.subscribes[3] = this.geoRef.obtenerCiudades(value).subscribe(
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
      
      this.subscribes[4] = this.usuarioData.getUsuarioValid(this.datosPersonalesForm.get('usuario').value).subscribe(
        r => {
          if(r){
            this.loading = false;
            this.datosPersonalesForm.get('usuario').setValue('');
            this.datosPersonalesForm.get('usuario').markAllAsTouched();

            this.alert.error('El nombre de usuario elegido, ya se encuentra en uso. Por favor ingrese otro.');
            return;
          }

          let datosPersonales: IDatosPersonalesModel = {
            apellido: this.datosPersonalesForm.get('apellido').value,
            nombre: this.datosPersonalesForm.get('nombre').value,
            dni: this.datosPersonalesForm.get('dni').value,
            email: this.datosPersonalesForm.get('email').value,
            celular: this.datosPersonalesForm.get('celular').value,
            telefono: this.datosPersonalesForm.get('telefono').value,
            domicilio: this.datosPersonalesForm.get('domicilio').value,
            provincia: this.listadoProvincias.find( p => p.id === this.datosPersonalesForm.get('provincia').value),
            Ciudad: this.listadoCiudades.find( p => p.id === this.datosPersonalesForm.get('ciudad').value),
            fechaNacimiento: this.datosPersonalesForm.get('fechaNacimiento').value,
            usuario: this.datosPersonalesForm.get('usuario').value
          }

          this.datosPersonalesLoad.emit(datosPersonales);

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
