import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatosPersonalesComponent } from './shared/datos-personales/datos-personales.component';
import { MaterialCommonModule } from '../material-common.module';
import { DatosVehiculoComponent } from './shared/datos-vehiculo/datos-vehiculo.component';
import { CoberturasComponent } from './shared/coberturas/coberturas.component';
import { ResumenComponent } from './shared/resumen/resumen.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';


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
        CoberturasComponent,
        ResumenComponent,
        HeaderComponent,
        FooterComponent,
    ],
    exports: [
        DatosPersonalesComponent,
        DatosVehiculoComponent,
        CoberturasComponent,
        ResumenComponent,
        HeaderComponent,
        FooterComponent,
    ],
    providers: [],
})

export class ComponentsSharedModule { }