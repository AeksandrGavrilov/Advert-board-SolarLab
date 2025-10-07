import { Component, inject } from '@angular/core';
import { TieredMenuModule } from 'primeng/tieredmenu'; // 1. Импортируем TieredMenu
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RouterLink, RouterModule } from '@angular/router';
import { CategoryService } from '../../../services/api/category/category.service';
import { CategoryInterface } from '../../../interfaces/category.interface';
import { AdvertService } from '../../../services/business-logic/advert/advert.service';
import { MenuItem } from 'primeng/api';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-search-menu',
  imports: [
    TieredMenuModule, 
    InputTextModule,
    ButtonModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './search-menu.component.html',
  styleUrl: './search-menu.component.scss',
  standalone: true,
})
export class SearchMenuComponent {
  private categoryService = inject(CategoryService);
  private advertService = inject(AdvertService)
  menuItems: MenuItem[] = []; 
  loading = false;

  ngOnInit() {
    this.loadCategoriesForMenu(); 
  }

  loadCategoriesForMenu() {
    this.loading = true;

    this.categoryService.getCategoriesTree().pipe(
      tap((categoryTree: CategoryInterface[]) => {
        this.menuItems = this.buildMenuItems(categoryTree);
        console.log('Меню успешно создано', this.menuItems);
      }),
      catchError((error) => {
      console.error('Ошибка загрузки категории', error);
      return of(null);  
      }),
      tap(() => {
        this.loading = false;
      })
    ).subscribe()
  }

  private buildMenuItems(categories: CategoryInterface[]): MenuItem[] {
    return categories.map(category => {
      const menuItem: MenuItem = {
        label: category.name,
        icon: 'pi pi-folder',
        command: () => this.onCategorySelect(category.id)
      };

      if (category.items && category.items.length > 0) {
        menuItem.items = this.buildMenuItems(category.items);
      }

      return menuItem;
    });
  }

  private onCategorySelect(categoryId: string) {
    console.log('Выбрана категория', categoryId);
    this.advertService.setCurrentCategory(categoryId)
  }
}