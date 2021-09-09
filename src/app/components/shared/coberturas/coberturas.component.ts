import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ICoberturaModel } from '../../models/cobertura-model';
import { CoberturaDataService } from '../../services/cobertura-data.service';
import { alphaOrder } from '../utils/util';

@Component({
  selector: 'coberturas-component',
  templateUrl: './coberturas.component.html',
  styleUrls: ['./coberturas.component.scss']
})
export class CoberturasComponent implements OnInit {

  listadoCoberturas: ICoberturaModel[] = [];

  registroOk: boolean = false;
  // variable que me permite modificar el color del boton de Enviar
  disabledEnviar: boolean = true;
  colorEnviar: string = '';

  displayedColumns: string[] = ['titulo', 'puntaje', 'descripcion', 'franquicia','costo', 'granizo'];
  dataSource: MatTableDataSource<any>;
  selectedElement: ICoberturaModel;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Output() enviarCoberturaSelected = new EventEmitter<any>();

  constructor(private coberturaData: CoberturaDataService,
              private alert: ToastrService) { }

  ngOnInit(): void {
    this.obtenerCoberturas();
  }

  obtenerCoberturas(){
    this.coberturaData.getCoberturas().subscribe(
      c => {
        if(!c) return this.alert.error('Error al obtener las coberturas disponibles');

        this.listadoCoberturas = c;
        this.listadoCoberturas.sort( (a,b)=> alphaOrder(a.puntaje, b.puntaje, true));

        this.dataSource = new MatTableDataSource(this.listadoCoberturas);
        setTimeout( () => this.dataSource.paginator = this.paginator);
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
