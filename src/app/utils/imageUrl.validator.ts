import { ValidatorFn } from "@angular/forms";


export function imageUrlValidator(): ValidatorFn {
    const pattern = new RegExp('^https?:\/\/');

    return (control) => {
        const isInvalid = control.value === '' || pattern.test(control.value);
        return isInvalid ? null : { imageUrlValidator: true }
    }
}