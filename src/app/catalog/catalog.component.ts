import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Gift } from '../types/gift';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  gifts: Gift[] = []
  constructor(private apiService: AppService) { }

  ngOnInit(): void {
    this.apiService.getAll().subscribe((gifts)=>{
      console.log(gifts);
      
     this.gifts = gifts
    })
  }
}
