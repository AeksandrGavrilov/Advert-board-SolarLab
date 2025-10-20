import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CategoryInterface } from '../../../interfaces/category.interface';
import { CategoryService } from '../../api/category-api/category.service'; 
@Injectable({
  providedIn: 'root'
})
export class CategoryLogicService {
    private categoryApiService = inject(CategoryService)

    getAllCategories(): Observable<CategoryInterface[]> {
        return this.categoryApiService.getAllCategories();
    }
    getCategoriesTree(): Observable<CategoryInterface[]> { 
        return this.categoryApiService.getAllCategories().pipe(
        map(categories => this.buildCategoriesTree(categories))
        );
    }

    getCategoryById(id: string): Observable<CategoryInterface> {
        return this.categoryApiService.getCategoryById(id);
    }

    private buildCategoriesTree(categories: CategoryInterface[]): CategoryInterface[] {
        const categoryMap: { [id: string]: CategoryInterface } = {};
        const tree: CategoryInterface[] = [];

        categories.forEach(category => {
        categoryMap[category.id] = { ...category, items: [] }; 
        });

        categories.forEach(category => {
        const node = categoryMap[category.id];

        if (category.parentId === '00000000-0000-0000-0000-000000000000') {
            tree.push(node);
        } else if (categoryMap[category.parentId]) { 
            if (!categoryMap[category.parentId].items) {
            categoryMap[category.parentId].items = [];
            }
            categoryMap[category.parentId].items!.push(node);
        }
        });

        return tree;
    }
}
