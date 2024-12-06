import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Gift } from '../../types/gift';
import { AppService } from '../../app.service';
import { UserService } from '../../user/user.service';
import { AuthComponent } from '../../auth/auth.component';
import { LoaderComponent } from '../../shared/loader/loader.component';


@Component({
  selector: 'app-gift-details',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './gift-details.component.html',
  styleUrl: './gift-details.component.css'
})
export class GiftDetailsComponent implements OnInit {
  gift = {} as Gift;
  isOwner = false;
  isBougth = false;
  isLiked = false;
  isLoading = true;
  
  private giftId!: string;

  get isLoggedIn(): boolean {
    return this.userService.isLogged
  }

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }



  ngOnInit(): void {
    this.loadGiftDetails()
  }

  loadGiftDetails(): void {
    this.giftId = this.route.snapshot.params['giftId'];
    this.appService.getGiftById(this.giftId).subscribe((gift) => {
      this.gift = gift
      this.isLoading = false
    });
  }

  checkUser() {
    this.userService.getUserProfile().subscribe((user) => {

      this.isOwner = user._id == this.gift.userId;

      this.isBougth = this.gift.buyingList.some(x => x.toString() == user._id);
      this.isLiked = this.gift.likesList.some(x => x.toString() == user._id);

    });

    this.loadGiftDetails()
  }

  deleteGift() {

    this.appService.deleteGiftById(this.giftId).subscribe(() => {
      this.router.navigate(['/catalog'])
    });
  }

  likeGift() {
    this.appService.likeGift(this.giftId).subscribe(() => {
      this.isLiked = true;
      this.loadGiftDetails()
    })
  }

  buyGift() {
    this.appService.buyGift(this.giftId).subscribe(() => {
      this.isBougth = true;
      this.loadGiftDetails()
    })
  }

}
