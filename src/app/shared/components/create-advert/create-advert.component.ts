
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { AdvertApiService } from '../../../services/api/advert-api/advert-api.service';

@Component({
  selector: 'app-create-advert',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
  ],
  templateUrl: './create-advert.component.html',
  styleUrl: './create-advert.component.scss',
  standalone: true,
})
export class CreateAdvertComponent {
  private formBuilder = inject(FormBuilder);
  private advertApiService = inject(AdvertApiService);
  private messageService = inject(MessageService);

  createAdvertForm: FormGroup;

  constructor() {
    this.createAdvertForm = this.formBuilder.group({
        Name: ['', [Validators.required]],
        Cost: [null, [Validators.required, Validators.min(0)]],
        Phone: ['', [Validators.required]],
        Location: ['', [Validators.required]],
        CategoryId: ['', [Validators.required]]
    });
  };

  onSubmit() {
    console.log('=======onSubmit начинает работу======')
    console.log('onSubmit вызван, форма валидна:', this.createAdvertForm.valid);
    console.log('Значения формы:',this.createAdvertForm.value );

    const currentToken = localStorage.getItem('authToken');
    console.log('Токен в local storage:', currentToken);
    console.log('Длина токена - ', currentToken?.length)

    if (this.createAdvertForm.valid) {
        // const formData = new FormData();
        const formData = this.createAdvertForm.value;
        console.log('Собираем FormData из значений формы:', formData);

        const requestFormData = new FormData();

        requestFormData.append('Name', this.createAdvertForm.get('Name')?.value);
        requestFormData.append('Cost', this.createAdvertForm.get('Cost')?.value);
        requestFormData.append('Phone', this.createAdvertForm.get('Phone')?.value);
        requestFormData.append('Location', this.createAdvertForm.get('Location')?.value);
        requestFormData.append('CategoryId', this.createAdvertForm.get('CategoryId')?.value);

        console.log('FormData - содержимое:');
        for( let [key,value] of requestFormData.entries()) {
            console.log(` ${key}:`,value)
        }
        
        console.log('Вызываем advertApiService.createAdvert...');

        this.advertApiService.createAdvert(requestFormData).subscribe({
            next: (response) =>{
                console.log('========успех=======');
                console.log('Ответ от сервера:', response);

                this.messageService.add({
                    severity:'success',
                    summary: 'Успешно!',
                    detail: 'Объявление создано'
                });
                this.createAdvertForm.reset();
                console.log('Форма была сброшена после успешного создания объявления. Ура!')
            },
            error: (error) => {
                console.log('========ОШИБКА!!!!========')
                console.error('Полная ошибка', error);
                console.error('Статус ошибки', error.status);
                console.error('Текст ошибки', error.statusText);
                console.error('URL запроса', error.url)
                console.error('Заголовки ответа', error.headers)
                this.messageService.add({
                    severity:'error',
                    summary:'Ошибка!',
                    detail: 'Не удалось создать объявление'
                });
            },
            complete: () => {
                console.log('====завершение====')
                console.log('Observable завершен')
            }
        });
    } else {
        console.log('=====ФОРМА НЕВАЛИДНА=====');
        console.log('Состояние контролов');

        Object.keys(this.createAdvertForm.controls).forEach( key => {
            
            const control = this.createAdvertForm.get(key);
            console.log(`  ${key}:`, {
                valid: control?.valid,
                invalid: control?.invalid,
                errors: control?.errors,
                value: control?.value
            });
            control?.markAsTouched()
        });
    }
     console.log('=== КОНЕЦ onSubmit ===');
  }
}