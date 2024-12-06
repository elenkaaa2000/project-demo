import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppService } from '../app.service';
import { ErrorMsgService } from '../shared/error-msg/error-msg.service';

@Component({
  selector: 'app-404',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './404.component.html',
  styleUrl: './404.component.css'
})
export class PageNotFoundComponent implements OnInit {
  error = ''

  constructor(private errorMsg: ErrorMsgService) { }

  ngOnInit(): void {
    this.getError()
  }
  getError(): void {
    this.errorMsg.apiError$.subscribe((err: any) => {
      
      this.error = err?.message


    });

    setTimeout(() => {
      this.error = '';
    }, 5000)
  }
}
