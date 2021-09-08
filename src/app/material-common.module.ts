import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    declarations: [
    ],
    exports: [
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule
    ],
    providers: [  
        MatDatepickerModule,  
    ],
})

export class MaterialCommonModule { }