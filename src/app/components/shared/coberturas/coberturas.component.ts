import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ICoberturaModel } from '../../models/cobertura-model';
import { CoberturaDataService } from '../../services/cobertura-data.service';
import { alphaOrder } from '../utils/util';

@Component({
  selector: 'coberturas-component',
  templateUrl: './coberturas.component.html',
  styleUrls: ['./coberturas.component.scss']
})
export class CoberturasComponent implements OnInit, OnDestroy {

  listadoCoberturas: ICoberturaModel[] = [];

  registroOk: boolean = false;
  // variable que me permite modificar el color del boton de Enviar
  disabledEnviar: boolean = true;
  colorEnviar: string = '';

  selectedElement: ICoberturaModel;

  @Output() enviarCoberturaSelected = new EventEmitter<any>();

  subscribes: Subscription[] = [];

  constructor(private coberturaData: CoberturaDataService,
              private alert: ToastrService) { }

  ngOnInit(): void {
    this.obtenerCoberturas();
  }

  ngOnDestroy(): void{
    this.subscribes.forEach(s => s.unsubscribe());
  }

  obtenerCoberturas(){
    this.subscribes[0] = this.coberturaData.getCoberturas().subscribe(
      c => {
        if(!c) return this.alert.error('Error al obtener las coberturas disponibles');

        this.listadoCoberturas = c;
        this.listadoCoberturas.sort( (a,b)=> alphaOrder(a.puntaje, b.puntaje, true));
      }
    );
  }

  selectedRow(element){
    this.selectedElement = element;
    this.disabledEnviar = false;
    this.colorEnviar = 'primary';
  }

  guardar(){
    this.enviarCoberturaSelected.emit(this.selectedElement);
    this.alert.success('Cobertura seleccionada con exito.');
    this.disabledEnviar = true;
    this.colorEnviar = '';
    this.registroOk = true;
  }

}
