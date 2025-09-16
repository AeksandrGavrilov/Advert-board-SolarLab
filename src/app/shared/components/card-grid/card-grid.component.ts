import { Component, OnInit, inject } from '@angular/core';
import { AdvertService, Advert } from '../../../../services/advert.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-card-grid',
  imports: [
    CommonModule
    ],
  templateUrl: './card-grid.component.html',
  styleUrl: './card-grid.component.scss',
  standalone: true,
})
export class CardGridComponent implements OnInit{
  private advertService = inject(AdvertService);
  adverts: Advert[] = [];

  ngOnInit(): void {
    this.loadAdverts()
  }

  loadAdverts(): void {
    this.advertService.searchAdverts({}).subscribe({
      next: (response) => {
        this.adverts = response;
      }
    })
  }
  
}
