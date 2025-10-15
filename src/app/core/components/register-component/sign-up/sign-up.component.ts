import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button, ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthLogicService } from '../../../services/auth-logic/auth-logic.service';
import { RegisterNewUserInterface } from '../../../interfaces/register-new-user.interface';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  standalone: true,
})
export class SignUpComponent {
  private authService = inject(AuthLogicService);
  private dialogRef = inject(DynamicDialogRef);
  private messageToastService = inject(MessageService)

  registerData: RegisterNewUserInterface = {
    name: '',
    login: '',
    password: '',
    phone: '',
    };
    confirmPassword = '' ;
    loading  = false ;
    errorMessage = '';

    register() {
      if (this.registerData.password !== this.confirmPassword) {
        this.errorMessage ='Пароли не совпадают!';
        return;
      }
      if( this.registerData.password.length < 8) {
        this.errorMessage = 'Пароль должен содержать не менее восьми символов'
        return;
      }

      this.loading = true;
      this.errorMessage = '';

      this.authService.register(this.registerData).pipe(
        tap((userId) => {
          this.loading = false;
          this.messageToastService.add({
            severity: 'seccess',
            summary: 'Успех!',
            detail: 'Регистрация успешна!'
          });
          this.dialogRef.close(true);
        }),
        catchError( (error) =>{
          this.loading = false;
          if(error.status === 400) {
            this.errorMessage = 'Проверьте правильность данных';
          } else {
            this.errorMessage = 'неизветсная ошибка'
          }
          return of(null)
        })
        ).subscribe()
      }

    close() {
      this.dialogRef.close(false)
    }
}
