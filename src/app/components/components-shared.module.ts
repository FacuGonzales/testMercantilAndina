import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatosPersonalesComponent } from './shared/datos-personales/datos-personales.component';
import { MaterialCommonModule } from '../material-common.module';
import { LoadingComponent } from './shared/loading/loading.component';
import { DatosVehiculoComponent } from './shared/datos-vehiculo/datos-vehiculo.component';
import { CoberturasComponent } from './shared/coberturas/coberturas.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialCommonModule
    ],
    declarations: [
        DatosPersonalesComponent,
        DatosVehiculoComponent,
        LoadingComponent,
        CoberturasComponent,
    ],
    exports: [
        DatosPersonalesComponent,
        DatosVehiculoComponent,
        LoadingComponent,
        CoberturasComponent
    ],
    providers: [],
})

export class ComponentsSharedModule { }