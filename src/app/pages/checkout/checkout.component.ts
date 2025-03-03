import { CartService } from './../../core/services/cart/cart.service';
import { Component, OnInit , inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule , Validators} from '@angular/forms';
import { OrdersService } from '../../core/services/orders/orders.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-checkout',
  imports: [ ReactiveFormsModule ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
    private readonly activatedroute = inject(ActivatedRoute); 
    private readonly cartService = inject(CartService);
    private readonly ordersService = inject(OrdersService);
    private readonly router = inject(Router);

  cash!:boolean
  PaymentMethod():void{
    this.cash = this.cartService.cash;
  }

  CheckoutForm = new FormGroup({
    first_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
    last_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/)
    ]),
    address: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    zip: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\d{5}$/)
    ])
    })


    paymentMethod: string = '';

    setPaymentMethod(method: string): void {
      this.paymentMethod = method; // Store the selected payment method
    }
    
    SubmitForm(): void {
      if (!this.CheckoutForm.valid) {
        window.alert('All Fields are Required!!');
        return;
      }
    
      if (this.paymentMethod === 'card') {
        this.ordersService.CheckVisaPayment(this.CartId, this.CheckoutForm.value).subscribe({
          next: (res) => {
            console.log(res);
            open(res.session.url, '_self');
          },
          error: (err) => {
            console.log(err);
          }
        });
      } else if (this.paymentMethod === 'cash') {
        console.log('Processing cash payment...');
        this.ordersService.CheckCashPayment(this.CartId, this.CheckoutForm.value).subscribe({
          next: (res) => {
            Swal.fire({
              text:"Order is Placed :)",
              icon: "success",
              confirmButtonColor: "#00A63E",
              confirmButtonText: "OK"
            });
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    }
    
    
  CartId:string = '';
  GetCardId():void{
    this.activatedroute.paramMap.subscribe({
      next:(param)=>{
        this.CartId = param.get('Id') !;
      }
    })
  }

  ngOnInit(): void {
  this.PaymentMethod();
  this.GetCardId();
  }
}

