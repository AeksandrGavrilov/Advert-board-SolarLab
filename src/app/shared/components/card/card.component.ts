import { Component, Input } from '@angular/core';
import { Advert } from '../../../interfaces/advert.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  standalone: true,
})
export class CardComponent {
  @Input() advert!: Advert;
}
