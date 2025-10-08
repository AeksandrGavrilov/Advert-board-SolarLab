import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Select } from 'primeng/select';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AdvertApiService } from '../../../services/api/advert-api/advert-api.service';
import { CategoryInterface } from '../../../interfaces/category.interface';
import { CategoryService } from '../../../services/api/category/category.service';
import { catchError, of, tap, Subscription, switchMap, finalize } from 'rxjs';
import { DadataInterface } from '../../../interfaces/dadata-interface';
import { DadataApiService } from '../../../services/api/dadata-api/dadata-api.service';
import { ImageService } from '../../../services/business-logic/img/image.service';

@Component({
  selector: 'app-create-advert',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    Select,
    ProgressSpinnerModule,
    AutoCompleteModule
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
  private dadataApiService = inject(DadataApiService)
  private imageService = inject(ImageService)

  createAdvertForm: FormGroup;
  categories: CategoryInterface[] = [];
  loadingCategories = false;
  
  addressSuggestion: DadataInterface[] = [];
  loadingAddress = false;
  
  selectedFiles: File[] = [];
  maxFiles = 5;

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
  
  searchAddress (event: any) {
    console.log('🟡 Метод searchAddress вызван. event.query:', event.query);
    const query = event.query

    if (query && query.length > 2) {
        this.loadingAddress = true;
        this.addressSuggestion = [];

        this.dadataApiService.getAdressSuggestion(query).pipe (
            tap ((suggestion) => {
                this.addressSuggestion = suggestion;
                console.log('Полученны подсказки для адресов', suggestion);
            }),
            catchError ((error) => {
                console.error('Не удалось загрузить адреса', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Ошибка',
                    detail: 'Не удалось загрузить подсказки адресов'
            });
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
        if (files) {
            for (let i = 0; i < files.length; i++) {
                if (files[i].type.startsWith('image/') && this.selectedFiles.length < this.maxFiles) {
                    this.selectedFiles.push(files[i]);
                }
            }
        if (this.selectedFiles.length > this.maxFiles) {
            this.messageService.add({
                severity: 'error',
                summary: 'ошибка!',
                detail: `Можно отправлять не более ${this.maxFiles} изображений` 
            });
        }    
        console.log('ВЫбрано файлов', this.selectedFiles.length);
        }
        event.target.value = '';
    }

    removeFile(index: number): void {
        this.selectedFiles.splice(index, 1);
        console.log('Файл был удален, еще осталось', this.selectedFiles.length)
    }

    uploadingAllImageForAdvert( advertId: string): void {
        if (this.selectedFiles.length === 0 ) {
            console.log('Нет файлов для загрузки!');
            return;
        }
        this.imageService.uploadSomeImages(advertId, this.selectedFiles).pipe(
            tap((response) =>{
                console.log('Все изображения загружены!', response);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Успех!',
                    detail: `Загружено ${response.length} изображений `
                });
                this.selectedFiles = [];
            }) ,
            catchError((error) => {
                console.log('Ошибка загрузки изображений', error);
                return of (null);
            })
        )
        .subscribe()
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

                const newAdvertId = response.id;
                if (newAdvertId && this.selectedFiles.length > 0) {
                    this.uploadingAllImageForAdvert(newAdvertId);
                } else {
                    this.selectedFiles = [];
                }
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