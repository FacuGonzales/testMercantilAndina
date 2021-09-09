import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IMarcaModel } from '../../models/marca-model';
import { VehiculoDataService } from '../../services/vehiculo-data.service';
import { alphaOrder } from '../utils/util'

@Component({
  selector: 'datos-vehiculo-component',
  templateUrl: './datos-vehiculo.component.html',
  styleUrls: ['./datos-vehiculo.component.scss']
})
export class DatosVehiculoComponent implements OnInit {

  loading: boolean = false;
  registroOk: boolean = false;

  // variable que me permite modificar el color del boton de Enviar
  disabledEnviar: boolean = false;
  colorEnviar: string = 'primary';

  // Contiene el formulario de los datos personales
  datosVehiculoForm: FormGroup;

  anioActual: number = new Date().getFullYear();
  anioMinimo: number = this.anioActual - 20;

  listadoMarca:IMarcaModel[] = [];
  listadoModelo: string[] = [];
  listadoVersiones:IMarcaModel[] = [];

  @Output() datosVehiculoLoad = new EventEmitter<any>();

  constructor(private vehiculosData: VehiculoDataService,
              private fb: FormBuilder,
              private alert: ToastrService) { }

  ngOnInit(): void {
    this.formInit();
    this.getMarcas();
    this.formSubscribe();

  }

  formInit(){
    this.datosVehiculoForm = this.fb.group({
      marca: ['', [Validators.required]],
      anio: [new Date().getFullYear(), [Validators.required]],
      modelo: ['', [Validators.required]],
      version: [''],
    });

    this.datosVehiculoForm.get('modelo').disable();
    this.datosVehiculoForm.get('version').disable();
    
  }

  formSubscribe(){
    this.datosVehiculoForm.get('marca').valueChanges.subscribe( m => this.getModelos());
    this.datosVehiculoForm.get('anio').valueChanges.subscribe(
      a => {
        let anio = a.toString()
        if(anio.length >= 4){
          if(anio <= this.anioActual && anio >= this.anioMinimo) this.getModelos();
        }
      }
    );

    this.datosVehiculoForm.get('modelo').valueChanges.subscribe( m => this.getVersiones());
  }

  get formControl(){
    return this.datosVehiculoForm.controls;
  }

  getMarcas(){
    this.vehiculosData.getInfoVehiculos().subscribe(
      r => {
        if(!r) return this.alert.error('Error al obtener las marcas.');
        
        this.listadoMarca = r;
        this.listadoMarca.sort( (a,b)=> alphaOrder(a.desc, b.desc));
      }
    );
  }

  getModelos(){
    if(!this.datosVehiculoForm.get('marca').value) return this.alert.info('Inidque la marca para visualizar los modelos');
    if(!this.datosVehiculoForm.get('anio').value) return this.alert.info('Indique el año para visualizar los modelos');

    this.vehiculosData.getInfoVehiculos(this.datosVehiculoForm.get('marca').value, this.datosVehiculoForm.get('anio').value).subscribe(
      r => {
        if(!r) return this.alert.error('Error al obtener los modelos.');

        this.datosVehiculoForm.get('modelo').enable();
        this.listadoModelo = r;
      }
    );
  }

  getVersiones(){
    if(!this.datosVehiculoForm.get('marca').value) return this.alert.info('Inidque la marca para visualizar los modelos');
    if(!this.datosVehiculoForm.get('anio').value) return this.alert.info('Indique el año para visualizar los modelos');
    if(!this.datosVehiculoForm.get('modelo').value) return this.alert.info('Indique el modelo para visualizar las versiones');

    this.vehiculosData.getInfoVehiculos(this.datosVehiculoForm.get('marca').value, this.datosVehiculoForm.get('anio').value, this.datosVehiculoForm.get('modelo').value).subscribe(
      r => {
        if(!r) return this.alert.error('Error al obtener las versiones.');

        this.datosVehiculoForm.get('version').enable();
        this.listadoVersiones = r;
        this.listadoVersiones.sort( (a,b)=> alphaOrder(a.desc, b.desc));
      }
    );
  }

  guardar(){
    if(this.datosVehiculoForm.valid){
      localStorage.setItem('datos-vehiculo', JSON.stringify(this.datosVehiculoForm.value));
      this.datosVehiculoLoad.emit(this.datosVehiculoForm.value);
      
      this.alert.success('Se creo correctamente ');
      this.disabledEnviar = true;
      this.colorEnviar = '';
      this.registroOk = true;
    }else{
      this.datosVehiculoForm.updateValueAndValidity();
      this.datosVehiculoForm.markAllAsTouched();
      this.alert.error('El formulario posee campos invalidos.');
    }
  }

}
