import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosVehiculoComponent } from './datos-vehiculo.component';

describe('DatosVehiculoComponent', () => {
  let component: DatosVehiculoComponent;
  let fixture: ComponentFixture<DatosVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosVehiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
