import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPagesComponent } from './formulario-pages.component';

describe('FormularioPagesComponent', () => {
  let component: FormularioPagesComponent;
  let fixture: ComponentFixture<FormularioPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
