import { Component, inject, Input } from '@angular/core';
import { Advert } from '../../../interfaces/advert.interface';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../../services/business-logic/img/image.service';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  standalone: true,
})
export class CardComponent {
  @Input() advert!: Advert;
  @Input() imageUrl!: string;
}
