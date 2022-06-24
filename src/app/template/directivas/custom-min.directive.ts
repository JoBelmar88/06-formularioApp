import { Directive, Input } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Directive({
  selector: '[customMin][ngModel]'
})
export class CustomMinDirective implements Validators {
  @Input() minimo!: number;

  constructor(){
    console.log('Directiva', this.minimo);
  }

  validate(control: FormControl) {
    const inputValue = control.value;

    console.log(inputValue);
  }
}
