import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  login: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/), Validators.minLength(8)]),
  });

  isLoading: boolean = false;
  msgError: string = '';
  isSuccess: string = '';

  SendLoginForm(): void {
    if (!this.login.valid) {
      return; // Prevent submitting if the form is invalid
    }
    this.isLoading = true;
      this.authService.SendLoginForm(this.login.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.isSuccess = res.message;
            setTimeout(() => {
              localStorage.setItem('UserToken', res.token);
              this.authService.SaveUserData()
              this.router.navigate(['/home']);
            }, 3000);
          }
        },
        error: (err) => {
          this.msgError = err.error.message;
          console.log(this.msgError);
          this.isLoading = false;
        }
      });
    }
  }



