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
  isBougth = false;
  isLiked = false;

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
              
        this.isBougth = this.gift.buyingList.some(x => x.toString() == user._id);
        this.isLiked = this.gift.likesList.some(x => x.toString() == user._id);
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
    this.appService.likeGift(id).subscribe((gift) => {
      console.log(gift);
      
      this.router.navigate([this.router.url])
    })
  }

  buyGift() {
    const id = this.route.snapshot.params['giftId'];
    this.appService.buyGift(id).subscribe(() => {
      this.router.navigate([this.router.url])
    })
  }

}
