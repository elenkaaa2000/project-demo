import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ErrorMsgService } from '../../shared/error-msg/error-msg.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  errorMessage = ''
  constructor(private userService: UserService, private router: Router, private errorMsgService: ErrorMsgService) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    if (form.invalid) {
      console.log('Invalid form')
      return
    }

    const { email, password } = form.value;
    this.userService.login(email, password).subscribe(() => {
      this.router.navigate(['/'])
    })

  }
}
