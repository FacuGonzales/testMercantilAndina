import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioPagesComponent } from './pages/formulario-pages.component';
import { ComponentsSharedModule } from './components-shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsRoutingModule,
        ComponentsSharedModule
    ],
    declarations: [
        FormularioPagesComponent
    ],
    exports: [
    ],
    providers: [],
})

export class ComponentsModule { }