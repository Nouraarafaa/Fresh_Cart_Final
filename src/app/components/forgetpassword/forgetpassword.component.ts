import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
  private readonly toastrService = inject(ToastrService);
  private readonly auth = inject(AuthService)
  private readonly router = inject(Router)

  VerifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  VerifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6}$/)]),
  });

  ResetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/), Validators.minLength(8)]),
  });

  Step: number = 1;
  VerifyEmailSubmit(): void {
    let emailValue = this.VerifyEmail.get('email')?.value;
    this.ResetPassword.get('email')?.patchValue(emailValue)
    this.auth.SetEmailApi(this.VerifyEmail.value).subscribe({
      next: (res) => {
        console.log(res)
        if (res.statusMsg == 'success') {
          this.Step = 2;
        }
      },
      error: (err) => {
        console.log(err)
        this.toastrService.error(err.error.message)
      }
    })
  }
  VerifyCodeSubmit(): void {
    this.auth.VerifyCode(this.VerifyCode.value).subscribe({
      next: (res) => {
        console.log(res)
        if (res.status == 'Success') {
          this.Step = 3;
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  SetNewPasswordSubmit(): void {

    this.auth.ResetPassword(this.ResetPassword.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('UserToken', res.token);
        Swal.fire({
          text: "Password is changed successfully",
          icon: "success",
          confirmButtonColor: "#00A63E",
          confirmButtonText: "OK"
        });
        this.auth.SaveUserData();
        this.router.navigate(['/home'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
