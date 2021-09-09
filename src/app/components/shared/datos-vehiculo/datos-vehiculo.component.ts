import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IDatosVehiculoModel } from '../../models/datos-vehiculo-model';
import { IMarcaModel } from '../../models/marca-model';
import { VehiculoDataService } from '../../services/vehiculo-data.service';
import { alphaOrder } from '../utils/util'

@Component({
  selector: 'datos-vehiculo-component',
  templateUrl: './datos-vehiculo.component.html',
  styleUrls: ['./datos-vehiculo.component.scss']
})
export class DatosVehiculoComponent implements OnInit, OnDestroy {

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

  subscribes: Subscription[] = [];

  constructor(private vehiculosData: VehiculoDataService,
              private fb: FormBuilder,
              private alert: ToastrService) { }

  ngOnInit(): void {
    this.formInit();
    this.getMarcas();
    this.formSubscribe();
  }

  ngOnDestroy(): void{
    this.subscribes.forEach(s => s.unsubscribe());
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
    this.subscribes[0] = this.datosVehiculoForm.valueChanges.subscribe( p => {
      this.disabledEnviar = false; 
      this.colorEnviar = 'primary';
      this.registroOk = false;
    });

    
     this.subscribes[1] = this.datosVehiculoForm.get('marca').valueChanges.subscribe( m => this.getModelos());
     this.subscribes[2] = this.datosVehiculoForm.get('anio').valueChanges.subscribe(
      a => {
        let anio = a.toString()
        if(anio.length >= 4){
          if(anio <= this.anioActual && anio >= this.anioMinimo) this.getModelos();
        }
      }
    );

    this.subscribes[3] = this.datosVehiculoForm.get('modelo').valueChanges.subscribe( m => this.getVersiones());
  }

  get formControl(){
    return this.datosVehiculoForm.controls;
  }

  getMarcas(){
    this.subscribes[4] = this.vehiculosData.getInfoVehiculos().subscribe(
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

    this.subscribes[5] = this.vehiculosData.getInfoVehiculos(this.datosVehiculoForm.get('marca').value, this.datosVehiculoForm.get('anio').value).subscribe(
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

    this.subscribes[6] = this.vehiculosData.getInfoVehiculos(this.datosVehiculoForm.get('marca').value, this.datosVehiculoForm.get('anio').value, this.datosVehiculoForm.get('modelo').value).subscribe(
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

      let datosVehiculo: IDatosVehiculoModel = {
        marca: this.listadoMarca.find( m => m.codigo == this.datosVehiculoForm.get('marca').value),
        anio: this.datosVehiculoForm.get('anio').value,
        modelo: this.datosVehiculoForm.get('modelo').value,
        version: this.listadoVersiones.find( v => v.codigo == this.datosVehiculoForm.get('version').value)
      }
      
      this.datosVehiculoLoad.emit(datosVehiculo);
      
      this.alert.success('Se cargó correctamente los datos del vehiculo.');
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
