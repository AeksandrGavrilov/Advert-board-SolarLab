
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { SelectModule, Select } from 'primeng/select';
import { AdvertApiService } from '../../../services/api/advert-api/advert-api.service';
import { CategoryInterface } from '../../../interfaces/category.interface';
import { CategoryService } from '../../../services/api/category/category.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-create-advert',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    Select
],
  templateUrl: './create-advert.component.html',
  styleUrl: './create-advert.component.scss',
  standalone: true,
})
export class CreateAdvertComponent {
  private formBuilder = inject(FormBuilder);
  private advertApiService = inject(AdvertApiService);
  private messageService = inject(MessageService);
  private categoryService = inject(CategoryService);
  

  createAdvertForm: FormGroup;
  categories: CategoryInterface[] = [];
  loadingCategories = false;

  constructor() {
    this.createAdvertForm = this.formBuilder.group({
        Name: ['', [Validators.required]],
        Cost: [null, [Validators.required, Validators.min(0)]],
        Phone: ['', [Validators.required]],
        Location: ['', [Validators.required]],
        CategoryId: ['', [Validators.required, Validators.min(4)]]
    });
  };

  ngOnInit() {
    this.loadCategories()
  };

  loadCategories() {
    this.loadingCategories = true;

    this.categoryService.getAllCategories().pipe(
        tap((categories) => {
            this.categories = categories;
            console.log('Категории загружены', categories)
        }),
        catchError((error) => {
            console.error('Ошибка загрузки категорий',error);
            this.messageService.add({
                severity:'error',
                summary: 'Ошибка!',
                detail: 'Ошибка загрузки категорий'
            });
            return of([]);
        }),
        tap(() => {
            this.loadingCategories = false;
        })
    ).subscribe();
  }
  
  onSubmit() {
   
    console.log('Отправка формы создания объявления');

    const currentToken = localStorage.getItem('authToken');
    console.log('Токен в local storage:', currentToken ? 'присутствует': 'отсутсвует');
    
    console.log('Все значения формы:', this.createAdvertForm.value);
    console.log('Тип Cost:', typeof this.createAdvertForm.get('Cost')?.value);

    if (this.createAdvertForm.valid) {
      
        const requestFormData = new FormData();

        requestFormData.append('Name', this.createAdvertForm.get('Name')?.value);
        requestFormData.append('Cost', this.createAdvertForm.get('Cost')?.value);
        requestFormData.append('Phone', this.createAdvertForm.get('Phone')?.value);
        requestFormData.append('Location', this.createAdvertForm.get('Location')?.value);
        requestFormData.append('CategoryId', this.createAdvertForm.get('CategoryId')?.value);

        const selectedCategoryId = this.createAdvertForm.get('CategoryId')?.value;
        console.log('Выбранный ID категории:', selectedCategoryId);
        console.log('Тип выбранного ID:', typeof selectedCategoryId);
        console.log('Длина ID:', selectedCategoryId?.length);
        
        requestFormData.append('CategoryId', selectedCategoryId);
     
        console.log('Данные формы заполнены, отправка на бэк...');

        this.advertApiService.createAdvert(requestFormData).pipe(
            tap((response) => {
                console.log('Объявление создано успешно', response);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Успех!',
                    detail: 'Объявление создано'
                });
                this.createAdvertForm.reset();
            }),
            catchError((error) => {
                console.error('Ошибка при создании объявления:', error);
                this.messageService.add({
                    severity:'error',
                    summary:'Ошибка!',
                    detail:'Ошибка при создании объявления'
                });
                return of (null);
            })
        ).subscribe();
        }else {
            console.log('Форма не валидна, проверьте заполнение обязательных полей');

            Object.keys(this.createAdvertForm.controls).forEach(key => {
                this.createAdvertForm.get(key)?.markAsTouched()
            });
        }
    }
}