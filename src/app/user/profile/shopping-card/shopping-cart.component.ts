import { Component, OnInit } from '@angular/core';

import { UserService } from '../../user.service';
import { AuthUser } from '../../../types/user';
import { Router, RouterLink } from '@angular/router';
import { LoaderComponent } from '../../../shared/loader/loader.component';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCardComponent implements OnInit {
  user: AuthUser | null = null
  totalPrice: number = 0
isLoading = true;

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

      this.isLoading = false
    });
  }

  remove(id: string) {
    this.userService.removeItemFromCard(id).subscribe(() => {
      this.loudUserData()
    })

  }

  checkOut(){
    this.userService.clearShopCard().subscribe((updatedUser)=>{
      this.user = updatedUser;              
      this.router.navigate(['/order-completed'])
    })
  }
}



