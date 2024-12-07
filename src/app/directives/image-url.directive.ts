import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { imageUrlValidator } from '../utils/imageUrl.validator';

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
 @Input() appImageUrl: string | undefined
  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const validatorFn = imageUrlValidator();
    return validatorFn(control)


  }
}
