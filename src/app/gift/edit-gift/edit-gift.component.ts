import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageUrlDirective } from '../../directives/image-url.directive';
import { AppService } from '../../app.service';
import { Gift, GiftDetails } from '../../types/gift';
import { ActivatedRoute, Router } from '@angular/router';
import { imageUrlValidator } from '../../utils/imageUrl.validator';

@Component({
  selector: 'app-edit-gift',
  standalone: true,
  imports: [ReactiveFormsModule, ImageUrlDirective],
  templateUrl: './edit-gift.component.html',
  styleUrl: './edit-gift.component.css'
})
export class EditGiftComponent implements OnInit {

  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute) { }

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    delivery: new FormControl('', [Validators.required, Validators.min(1)]),
    imageUrl: new FormControl('', [Validators.required, imageUrlValidator])
  })

  titleControl = this.form.get('title');
  categoryControl = this.form.get('category');
  descriptionControl = this.form.get('description');
  priceControl = this.form.get('price');
  deliveryControl = this.form.get('delivery');
  imageUrlControl = this.form.get('imageUrl');
 
  ngOnInit(): void {
    const id = this.route.snapshot.params['giftId'];
    this.appService.getGiftById(id).subscribe((gift) => {

      const { title, category, description, price, delivery, imageUrl } = gift

      this.form.setValue({
        title: title,
        category: category,
        description: description,
        price: price,
        delivery: delivery,
        imageUrl: imageUrl
      })

    })
  }

  edit() {
    if (this.form.invalid) {
      console.log('Invalid form')
    }

    const { title, category, description, price, delivery, imageUrl } = this.form.value
    const id = this.route.snapshot.params['giftId'];
    this.appService.updateGiftById(id, title!, category!, description!, price!, delivery!, imageUrl!).subscribe(() => {
      this.router.navigate(['/catalog'])
    })
  }


}
