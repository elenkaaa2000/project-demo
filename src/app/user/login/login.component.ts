import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login(form: NgForm) {
    if (form.invalid) {
      console.log('Invalid form')
      return
    }

    console.log(form.value)
  }
}
