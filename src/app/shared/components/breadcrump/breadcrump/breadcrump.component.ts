import { Component, inject } from '@angular/core';
import { BreadcrumbService } from '../../../../services/business-logic/breadcrumb/breadcrump.service';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-breadcrumps',
  imports: [
    CommonModule,
    BreadcrumbModule
  ],
  templateUrl: './breadcrump.component.html',
  styleUrl: './breadcrump.component.scss'
})
export class BreadcrumpsComponent {
  private breadcrumbService = inject(BreadcrumbService);

  breadcrumbs: MenuItem[] = [];
  home: MenuItem = { icon: 'pi pi-home' }; 

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs$.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
    });
  }
}
