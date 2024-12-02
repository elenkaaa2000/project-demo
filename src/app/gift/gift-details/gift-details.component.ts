import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Gift } from '../../types/gift';
import { AppService } from '../../app.service';
import { UserService } from '../../user/user.service';
import { AuthComponent } from '../../auth/auth.component';


@Component({
  selector: 'app-gift-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './gift-details.component.html',
  styleUrl: './gift-details.component.css'
})
export class GiftDetailsComponent implements OnInit {
  gift = {} as Gift;
  isOwner = false;
  
  get isLoggedIn(): boolean {
    return this.userService.isLogged
  }

  constructor(private appService: AppService, private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['giftId'];
    this.appService.getGiftById(id).subscribe((gift) => {
      this.gift = gift

      this.userService.getUserProfile().subscribe((user) => {


        this.isOwner = user._id == this.gift.userId;
      });
    })
  }

  deleteGift() {
    const id = this.route.snapshot.params['giftId'];
    this.appService.deleteGiftById(id).subscribe(() => {
      this.router.navigate(['/catalog'])
    })
  }

  likeGift() {
    const id = this.route.snapshot.params['giftId'];
    this.appService.likeGift(id).subscribe(() => {
      this.router.navigate([`gifts/details/${id}`])
    })
  }

  buyGift() {
    const id = this.route.snapshot.params['giftId'];
    this.appService.buyGift(id).subscribe(() => {
      this.router.navigate(['gifts/details/${id}'])
    })
  }

  get isLiked(): boolean {
    return true
  }

  get isBougth(): boolean {
    return true
  }

}
