import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatosPersonalesComponent } from './shared/datos-personales/datos-personales.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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