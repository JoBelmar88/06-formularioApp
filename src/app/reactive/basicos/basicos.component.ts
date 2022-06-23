import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: []
})
export class BasicosComponent {

/* miFormulario: FormGroup = new FormGroup({
  'nombre': new FormControl('RTX 4080ti'),
  'precio': new FormControl(1500),
  'existencias': new FormControl(100)
}) */

  miFormulario: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    precio: [, [Validators.required, Validators.min(0)]],
    existencias: [, [Validators.required, Validators.min(0)]]
  })
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(){
    this.miFormulario.reset({
      nombre: 'RTX 4080',
      precio: 1600,
      existencias: 10
    })
  }


  campoNoEsValido(campo: string){
    return this.miFormulario.controls[campo].errors &&
    this.miFormulario.controls[campo].touched
  }

  guardar(){
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }
}
