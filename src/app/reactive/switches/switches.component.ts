import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: []
})
export class SwitchesComponent implements OnInit {

  miFormulario: FormGroup = this.formBuilder.group({
    genero: ['M', [Validators.required]],
    notificaciones: [true, [Validators.required]],
    condiciones: [false, [Validators.requiredTrue]]
  });

  persona = {
    genero: 'F',
    notificaciones: true
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.miFormulario.reset({
      ...this.persona,
      condiciones:false
    });

    // de esta manera abstraemos la propiedad condiciones y entregamos el resto de las propiedades
    this.miFormulario.valueChanges.subscribe( ({condiciones, ...rest}) => {
        this.persona = rest;
    });
  };

  guardar(){
    const fromValue = {...this.miFormulario.value};
    delete fromValue.condiciones;

    this.persona = fromValue;
  }

}
