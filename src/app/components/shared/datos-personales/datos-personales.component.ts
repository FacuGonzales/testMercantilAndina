import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'datos-personales-component',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss']
})
export class DatosPersonalesComponent implements OnInit {

  datosPersonalesForm: FormGroup;

  regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@#$%^&+=!_*-]{8,14}$/;
  regPassValid: boolean;

  password: string;
  passwordValid: boolean;
  minLenghtPass: boolean;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit(){
    this.datosPersonalesForm = this.fb.group({
      apellido: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15)])],
      nombre: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15)])],
      dni: ['', Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(8)])],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10)])],
      telefono: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10)])],
      domicilio: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      fechaNacimiento: [''],
      usuario: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      password: ['', [Validators.required]],
    })
  }

  
  get f(){
    return this.datosPersonalesForm.controls;
  }

  soloNumeros(_evnt, numeros){
    _evnt = _evnt ? _evnt : window.event;

    let charCode = _evnt.which ? _evnt.which : _evnt.keyCode;
    
    if(numeros){
      if(charCode >= 48 && charCode <=57) return true;

      return false;

    }else{
      if(charCode == 46 || (charCode >= 48 && charCode <=57)) return true;

      return false;
    }
  }

  validarPassword(value){
    this.password = value

    this.regPassValid = this.regPass.test(value)

    if(this.password.length >= 8){
      this.passwordValid = true;
      this.minLenghtPass = true
    }else{
      this.passwordValid = false;
      this.minLenghtPass = false
    }
  }


}
