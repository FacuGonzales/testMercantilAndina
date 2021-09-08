import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatosPersonalesComponent } from './shared/datos-personales/datos-personales.component';
import { MaterialCommonModule } from '../material-common.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialCommonModule
    ],
    declarations: [
        
        DatosPersonalesComponent
    ],
    exports: [
        DatosPersonalesComponent
    ],
    providers: [],
})

export class ComponentsSharedModule { }