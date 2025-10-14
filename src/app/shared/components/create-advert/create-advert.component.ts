import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { MenuItem, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AdvertService } from '../../../services/business-logic/advert-logic/advert.service';
import { CategoryInterface } from '../../../interfaces/category.interface';
import { CategoryLogicService } from '../../../services/business-logic/Category-logic/category-logic.service'; 
import { catchError, of, tap, map, finalize } from 'rxjs';
import { DadataInterface } from '../../../interfaces/dadata-interface';
import { DadataApiService } from '../../../services/api/dadata-api/dadata-api.service';
import { Router } from '@angular/router';
import { TieredMenuModule } from 'primeng/tieredmenu';

@Component({
  selector: 'app-create-advert',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    ProgressSpinnerModule,
    AutoCompleteModule,
    TieredMenuModule
],
  templateUrl: './create-advert.component.html',
  styleUrl: './create-advert.component.scss',
  standalone: true,
})
export class CreateAdvertComponent {
    private formBuilder = inject(FormBuilder);
    private advertService = inject(AdvertService);
    private messageService = inject(MessageService);
    private categoryService = inject(CategoryLogicService);
    private dadataApiService = inject(DadataApiService)
    private router = inject(Router)

    categoriesTree: CategoryInterface[] = [];
    menuItems: MenuItem[] = [];
    selectedCategoryName: string = 'Выберете категорию';
    loadingCategories = false;
  
    addressSuggestion: DadataInterface[] = [];
    loadingAddress = false;
    selectedFiles: File[] = [];
    createAdvertForm: FormGroup;


    constructor() {
        this.createAdvertForm = this.formBuilder.group({
            Name: ['', [Validators.required, Validators.minLength(4)]],
            CategoryId: ['', [Validators.required]],
            Cost: [null, [Validators.required, Validators.min(0)]],
            Phone: ['', [Validators.required]],
            Location: ['', [Validators.required]],
            Description:['']
        });
    };

    ngOnInit() {
    this.loadCategories()
  };

    loadCategories() {
    this.loadingCategories = true;

    this.categoryService.getCategoriesTree().pipe(
        tap((categoriesTree) => {
          this.menuItems = this.buildMenuItems(categoriesTree)
        }),
        catchError((error) => {
            console.error('Ошибка загрузки категорий',error);
            return of([]);
        }),
        tap(() => {
            this.loadingCategories = false;
        })
    ).subscribe();
  };

  private buildMenuItems(categories: CategoryInterface[]): MenuItem[] {
    return categories.map( category => {
        const menuItem: MenuItem = {
            label: category.name,
            icon: 'pi pi-folder'
        };

        if (category.items && category.items.length > 0) {
            menuItem.items  = this.buildMenuItems(category.items);
        } else {
            menuItem.command = () => this.onCategorySelect(category.id, category.name)
            }
        
        return menuItem    
    })
  };
  
  onCategorySelect(categoryId: string, categoryName:string) {
    this.createAdvertForm.patchValue({
        CategoryId: categoryId
    });
    this.selectedCategoryName = categoryName
  };

  searchAddress (event: any) {
    const query = event.query

    if (query && query.length > 2) {
        this.loadingAddress = true;
        this.addressSuggestion = [];

        this.dadataApiService.getAdressSuggestion(query).pipe (
            tap ((suggestion) => {
                this.addressSuggestion = suggestion;
            }),
            catchError ((error) => {
                console.error('Не удалось загрузить адреса', error);
            return of ([]);
        }),
        finalize(() =>{
            this.loadingAddress = false;
        })
        ).subscribe();
    } else {
        this.addressSuggestion = [];
        this.loadingAddress = false;
    }
}

    onFileSelected(event: any): void {
       const files: FileList = event.target.files;
       if (files && files.length >0) {
        this.selectedFiles = Array.from(files);
       }
    };

    removeFile(index: number): void {
        this.selectedFiles.splice(index, 1);
    };

    onSubmit() {
    if (this.createAdvertForm.valid) {
      
        const requestFormData = new FormData();

            requestFormData.append('Name', this.createAdvertForm.get('Name')?.value);
            requestFormData.append('Cost', this.createAdvertForm.get('Cost')?.value);
            requestFormData.append('Phone', this.createAdvertForm.get('Phone')?.value);
            requestFormData.append('Location', this.createAdvertForm.get('Location')?.value);
            requestFormData.append('CategoryId', this.createAdvertForm.get('CategoryId')?.value);
            
            const discription = this.createAdvertForm.get('Description')?.value;
            if( discription) {
                requestFormData.append('Description',discription)
            } 

            if (this.selectedFiles.length >0) {
                this.selectedFiles.forEach(file =>{
                    requestFormData.append('Images', file, file.name)
                });
            }else {
                console.log('файл не был выбран')
            }

            this.advertService.createAdvert(requestFormData).pipe(
                tap((response: any) => {
                    this.router.navigate(['/adverts', response.id]);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Успех!',
                        detail:'Объявление создано успешно!'
                    })
                }),
                catchError((error) => {
                    console.error('create advert error', error);
                    this.messageService.add({
                        severity:'error',
                        summary:'ошибка!',
                        detail:'Не удалось создать объявление'
                    })
                    return of (null)
                })
            ).subscribe()
        }
    }
}        