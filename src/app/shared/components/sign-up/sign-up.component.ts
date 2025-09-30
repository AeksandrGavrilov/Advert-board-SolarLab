import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button, ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../../services/api/auth-service/auth.service';
import { RegisterNewUserInterface } from '../../../interfaces/register-new-user.interface';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

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
  private authService = inject(AuthService);
  private dialogRef = inject(DynamicDialogRef)

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

      this.authService.register(this.registerData).subscribe({
        next: (userId) =>{
          this.loading = false;
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.loading =false;
          if(error.status === 400) {
            this.errorMessage ='Проверьте правильность данных.';
          } else {
            this.errorMessage ='неизвестная ошибка'
          }
        }
      });
    }

    close() {
      this.dialogRef.close(false)
    }
}
