import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatosPersonalesComponent } from './shared/datos-personales/datos-personales.component';
import { MaterialCommonModule } from '../material-common.module';
import { LoadingComponent } from './shared/loading/loading.component';
import { DatosVehiculoComponent } from './shared/datos-vehiculo/datos-vehiculo.component';


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
        
    ],
    exports: [
        DatosPersonalesComponent,
        DatosVehiculoComponent,
        LoadingComponent
    ],
    providers: [],
})

export class ComponentsSharedModule { }