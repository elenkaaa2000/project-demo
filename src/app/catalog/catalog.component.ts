import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Gift } from '../types/gift';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../shared/loader/loader.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink,LoaderComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  gifts: Gift[] = []
  isLoading=true
  constructor(private apiService: AppService) { }

  ngOnInit(): void {
    this.apiService.getAll().subscribe((gifts)=>{         
     this.gifts = gifts
     this.isLoading = false
    })
  }
}
