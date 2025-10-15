import { Component, inject } from '@angular/core';
import { AuthLogicService } from '../../../services/auth-logic/auth-logic.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { SignUpComponent } from '../../register-component/sign-up/sign-up.component';
import { MessageService } from 'primeng/api';
import { catchError, of, tap } from 'rxjs';

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
  private authService = inject(AuthLogicService)
  private dialogRef = inject(DynamicDialogRef)
  private dialogService = inject(DialogService)
  private messageToastService = inject(MessageService)
  private dialogConfig = inject(DynamicDialogConfig)

  credentials ={login: 'Gavrilov', password: '0123456789'};
  loading = false;
  errorMessage = '';

  ngOnInit(){
    const redirectUrl = this.dialogConfig.data?.redirectUrl;
    if (redirectUrl) {
      console.log('URL для редиректа', redirectUrl)
    }
  }
  login(){
    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials).pipe(
      tap(() => {
        this.loading = false;
        this.messageToastService.add({
           severity: "success",
           summary: "Успешно!",
           detail: "Авторизация прошла успешно!"
        });
          this.dialogRef.close({
            success: true,
            redirectUrl: this.dialogConfig.data?.redirectUrl
          });
          catchError( (error) => {
            this.loading = false;
            this.errorMessage = 'Ошибка авторизации!';
            return of(null)
          })
      })
    ).subscribe()
  };

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
    this.dialogRef.close({success: false})
  }
}


