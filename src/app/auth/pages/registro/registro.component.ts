import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
import { ValidacionesService } from 'src/app/shared/validator/validaciones.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: []
})
export class RegistroComponent {

  miFormulario: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.pattern(this.serviceValidator.nombreApellidoPattern)], []],
    email: ['', [Validators.required, Validators.pattern(this.serviceValidator.emailPattern)], [this.emailValidatorService]],
    username: ['', [Validators.required, this.serviceValidator.noPuedeSerStrider], []],
    password: ['', [Validators.required, Validators.minLength(6)], []],
    passwordConfirm: ['', [Validators.required], []],
  }, {
    validators: [this.serviceValidator.camposIguales('password', 'passwordConfirm')]
  })

  constructor(private formBuilder: FormBuilder,
              private serviceValidator: ValidacionesService,
              private emailValidatorService: EmailValidatorService ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'José Belmar',
      email: 'test1@test.com',
      username: 'Goukoso'
    })
  }

  campoNoValido(campo: string){
    return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched;
  }

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if(errors?.['required']){
      return 'Email es obligatorio'
    } else if(errors?.['pattern']){
      return 'Email no válido'
    }else if(errors?.['emailTomado']){
      return 'Email ya fue tomado'
    }else{
      return ''
    }
  }

  /* emailRequired(){
    return this.miFormulario.get('email')?.touched
            && this.miFormulario.get('email')?.errors?.["required"];
  }

  emailFormato(){
    return this.miFormulario.get('email')?.touched
            && this.miFormulario.get('email')?.errors?.['pattern'];
  };

  emailTomado(){
    return this.miFormulario.get('email')?.touched
            && this.miFormulario.get('email')?.errors?.['pattern'];
  }; */

  submitFormulario(): void{
    console.log( this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }
}
