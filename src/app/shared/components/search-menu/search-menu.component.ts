import { Component } from '@angular/core';
import { MegaMenuModule } from 'primeng/megamenu';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-search-menu',
  imports: [
    MegaMenuModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './search-menu.component.html',
  styleUrl: './search-menu.component.scss',
  standalone: true,
})
export class SearchMenuComponent {


}
