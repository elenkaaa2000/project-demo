import { Component } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';



@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  get isLogged(): boolean {
    return this.userService.isLogged
  };

  constructor(private userService: UserService) { }  
  
}
