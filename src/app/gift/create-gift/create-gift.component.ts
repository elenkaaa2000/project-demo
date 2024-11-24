import { Component } from '@angular/core';
import { AppService } from '../../app.service';

import { FormsModule, NgForm } from '@angular/forms';
import { ImageUrlDirective } from '../../directives/image-url.directive';

@Component({
  selector: 'app-create-gift',
  standalone: true,
  imports: [FormsModule, ImageUrlDirective],
  templateUrl: './create-gift.component.html',
  styleUrl: './create-gift.component.css'
})
export class CreateGiftComponent {
  constructor(private apiService: AppService) { }

  create(form: NgForm) {
    if (form.invalid) {
      console.log('Invalid form')
    }

    console.log(form.value)
  }

}
