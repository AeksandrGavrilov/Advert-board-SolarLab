import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';


@Component({
  selector: 'app-header',
  imports: [
    ButtonModule,
    ButtonGroupModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent {
  customButtonNewAdToken = {
    primary: {
        background: '#3C84F6 !important',
    }
  
  };

  customButtonLoginToken = {
    // secondary: {
    //   textColor:  '#ffffff !important'
    // }
  }

}
