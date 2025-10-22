import { Component, inject } from '@angular/core';
import { TieredMenuModule } from 'primeng/tieredmenu'; 
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CategoryLogicService } from '../../../data-services/logic/Category-logic/category-logic.service'; 
import { CategoryInterface } from '../../../interfaces/category.interface';
import { MenuItem } from 'primeng/api';
import { catchError, of, tap } from 'rxjs';

import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-search-menu',
    imports: [
        TieredMenuModule, 
        InputTextModule,
        ButtonModule,
        RouterLink,
        RouterModule,
        FormsModule
    ],
    templateUrl: './search-menu.component.html',
    styleUrl: './search-menu.component.scss',
    standalone: true,
})
export class SearchMenuComponent {
    private categoryService = inject(CategoryLogicService);
    private router = inject(Router)

    searchText: string ='';
    menuItems: MenuItem[] = []; 
    loading = false;

    ngOnInit() {
        this.loadCategoriesForMenu(); 
    };

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
    };

    buildMenuItems(categories: CategoryInterface[]): MenuItem[] {
        return categories.map(category => {
        const menuItem: MenuItem = {
            label: category.name,
            icon: 'pi pi-folder',
        };

        if (category.items && category.items.length > 0) {
            menuItem.items = this.buildMenuItems(category.items);
        } else {
            menuItem.command = () => this.onCategorySelect(category.id)
        }

        return menuItem;
        });
    };
    onCategorySelect(categoryId: string) {
        console.log('Выбрана категория', categoryId);
        this.router.navigate(['/search'], {
        queryParams: { category: categoryId}
        })
    };
    onTextSearch(): void {
        this.router.navigate(['/search'], {
        queryParams: {search: this.searchText}
        });
        this.searchText = '';
    };
}