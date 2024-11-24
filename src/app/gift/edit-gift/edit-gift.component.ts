import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ImageUrlDirective } from '../../directives/image-url.directive';

@Component({
  selector: 'app-edit-gift',
  standalone: true,
  imports: [FormsModule, ImageUrlDirective],
  templateUrl: './edit-gift.component.html',
  styleUrl: './edit-gift.component.css'
})
export class EditGiftComponent {
  edit(form: NgForm) {
    if (form.invalid) {
      console.log('Invalid form')
    }

    console.log(form.value)
  }
}
