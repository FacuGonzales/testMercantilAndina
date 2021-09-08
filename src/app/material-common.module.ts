import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatCardModule,
        MatStepperModule,
        MatNativeDateModule,
        MatButtonModule,
        MatProgressBarModule,
    ],
    declarations: [
    ],
    exports: [
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatCardModule,
        MatStepperModule,
        MatNativeDateModule,
        MatButtonModule,
        MatProgressBarModule
    ],
    providers: [  
        MatDatepickerModule,  
    ],
})

export class MaterialCommonModule { }