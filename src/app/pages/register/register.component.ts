import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  register: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/) , Validators.minLength(8)]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]
  )}, { validators: this.ConfirmPassword });

  isLoading: boolean = false;
  msgError: string = '';
  isSuccess: string = '';

  SubmitForm(): void {
    if (!this.register.valid) {
      return; // Prevent submitting if the form is invalid
    }

    this.isLoading = true;
    
    this.authService.SendRegisterForm(this.register.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.message === 'success') {
          this.isSuccess = res.message;

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.msgError = err.error.message;
        console.log(this.msgError);
        this.isLoading = false;
      }
    });
  }

  ConfirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : { mismatch: true };
  }
}
