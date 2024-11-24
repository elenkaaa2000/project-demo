import { ValidatorFn } from "@angular/forms"

export function macthPasswordsValidator(
    passwordControlName: string,
    rePasswordControlName: string):
    ValidatorFn {
    return (control) => {
        const passwordFormControl = control.get(passwordControlName);
        const rePasswordFormControl = control.get(rePasswordControlName);

        const passMatch = passwordFormControl?.value === rePasswordFormControl?.value
        return passMatch ? null : { macthPasswordsValidator: true }
    }
}