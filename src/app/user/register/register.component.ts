import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { macthPasswordsValidator } from '../../utils/match-passwords.validator';
import { UserService } from '../user.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private userService: UserService) { }
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.minLength(10), Validators.email]),
    tel: new FormControl('', [Validators.required]),
    passGroup: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      rePassword: new FormControl('', [Validators.required])
    }, {
      validators: [macthPasswordsValidator('password', 'rePassword')]
    })
  });

  usernameControl = this.form.get('username');
  emailControl = this.form.get('email');
  telControl = this.form.get('tel');
  passGroup = this.form.get('passGroup')
  passwordControl = this.form.get('passGroup')?.get('password');
  rePassControl = this.form.get('passGroup')?.get('rePassword');

  inputRequired(controlName: string) {
    return (
      this.form.get(controlName)?.touched && this.form.get(controlName)?.errors?.['required']
    )
  }

  inputCorrectLength(controlName: string) {
    return (
      this.form.get(controlName)?.touched && this.form.get(controlName)?.errors?.['minlength']
    )
  }

  get correctEmail() {
    return (
      this.emailControl?.touched && this.emailControl?.errors?.['email']
    )
  }

  register() {
    if (this.form.invalid) {
      console.log('Invalid form')
      return
    }

    const userData:any = {
      username: this.usernameControl?.value,
      email: this.emailControl?.value,
      tel: this.telControl?.value,
      password: this.passwordControl?.value
    }    
   
     this.userService.registerUser(userData)

  }
}