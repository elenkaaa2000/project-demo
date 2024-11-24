import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appImageUrl]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: ImageUrlDirective
  }
  ]
})
export class ImageUrlDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {

    const pattern = /^https?:\/\//i;
    const value = control.value;

    return control.value && pattern.test(value) ? null : { invalidImageUrl: true }
  }
}
