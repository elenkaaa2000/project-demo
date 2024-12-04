import { Component, OnInit } from '@angular/core';

import { UserService } from '../../user.service';
import { AuthUser } from '../../../types/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-card',
  standalone: true,
  imports: [],
  templateUrl: './shopping-card.component.html',
  styleUrl: './shopping-card.component.css'
})
export class ShoppingCardComponent implements OnInit {
  user: AuthUser | null = null
  totalPrice: number = 0

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loudUserData()

  }

  loudUserData(): void {
    this.userService.getUserProfile().subscribe((userData) => {
      this.user = userData

      this.totalPrice = 0;

      if (this.user?.boughtGifts?.length) {
        const prices = this.user.boughtGifts.map(gift => Number(gift.price));
        for (let p of prices) {
          this.totalPrice += p
        }
      }
    });
  }

  remove(id: string) {
    this.userService.removeItemFromCard(id).subscribe(() => {
      this.loudUserData()
    })

  }
}



