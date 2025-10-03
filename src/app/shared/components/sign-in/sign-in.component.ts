import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/api/auth-service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-in',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  standalone: true,
})
export class SignInComponent {
  private authService = inject(AuthService)
  private dialogRef = inject(DynamicDialogRef)
  private dialogService = inject(DialogService)
  private messageToastService = inject(MessageService)

  credentials ={login: 'Gavrilov', password: '0123456789'};
  loading = false;
  errorMessage = '';

  login(){
    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials).subscribe({
      next :() => {
        this.loading = false;
        this.messageToastService.add({
          severity: "success",
          summary: "Успешно!",
          detail: "Авторизация прошла успешно!"
        })
        this.dialogRef.close(true);
      },
      error: (error) =>{
        this.loading = false;
        this.errorMessage = 'Ошибка авторизации' ;
        console.error('login error:', error)
      }
    });
  }

  openRegister() {
    this.dialogRef.close()
    this.dialogService.open(SignUpComponent, {
      header: 'Регистрация' ,
      width: '400px',
      modal: true,
      dismissableMask:true
    })
  }
  
  close () {
    this.dialogRef.close(false)
  }
}


