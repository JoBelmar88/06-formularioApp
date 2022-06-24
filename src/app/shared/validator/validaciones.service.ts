import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

  noPuedeSerStrider(control: FormControl): ValidationErrors | null{
    const valor = control.value?.trim().toLowerCase();
    if(valor === 'strider'){
      return {noStrider: true}
    }
    // cuando se retorna un null, significa que todo ocurrio bien, de lo contrario, hubo una incidencia
    return null;
  }

  camposIguales(campo1: string, campo2: string){
    return(formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if (pass1 !== pass2) {
        formGroup.get(campo2)?.setErrors({noIguales: true});
        return {noIguales: true}
      };

      // Tener cuidado, ya que está purgando las validaciones y puede tern efectos colaterales (otras validaciones)
      formGroup.get(campo2)?.setErrors(null);

      return null;
    }
  }
}
