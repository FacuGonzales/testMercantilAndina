import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule,
        MatTooltipModule,
        MatCardModule,
        MatStepperModule,
        MatButtonModule,
        MatProgressBarModule,
        MatIconModule,

    ],
    declarations: [
    ],
    exports: [
        MatCardModule,
        MatStepperModule,
        MatButtonModule,
        MatProgressBarModule,
        MatTooltipModule,
        MatIconModule,
    ],
    providers: [  
        MatDatepickerModule,  
    ],
})

export class MaterialCommonModule { }