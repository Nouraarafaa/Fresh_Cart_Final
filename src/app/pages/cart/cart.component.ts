import { RouterLink } from '@angular/router';
import { ICart } from '../../shared/interfaces/icart';
import { CartService } from './../../core/services/cart/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly ngxSpinnerService = inject(NgxSpinnerService);

  cartdetails: ICart = {} as ICart;

  GetCartData(): void {
    this.ngxSpinnerService.show()
    this.cartService.GetCart().subscribe({
      next: (res) => {
        this.cartdetails = res.data;
        this.ngxSpinnerService.hide()

      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  RemoveCartItem(id: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#00A63E",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.RemoveItem(id).subscribe({
          next: (res) => {
            this.cartdetails = res.data;

            Swal.fire({
              title: "Deleted!",
              text: "Item has been removed from your cart.",
              icon: "success",
              confirmButtonColor: "#00A63E",
              confirmButtonText: "OK"
            });
          },
          error: (err) => {
            console.error(err);
            Swal.fire({
              title: "Error!",
              text: "Failed to remove item. Please try again.",
              icon: "error"
            });
          }
        });
      }
    });
  }


  UpdateQuantity(id: string, count: number): void {
    this.ngxSpinnerService.show()
    this.cartService.UpdateQuantity(id, count).subscribe({
      next: (res) => {
        this.cartdetails = res.data;
        this.ngxSpinnerService.hide()


      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  ChoosePayment(choice: string) {
    this.cartService.CashOrVisa(choice);
  }
  ClearCartButton(): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33", // Red for delete
      cancelButtonColor: "#00A63E", // Green for cancel
      confirmButtonText: "Yes, Clear it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.ClearCart().subscribe({
          next: (res) => {
            if (res.message === "success") {
              this.cartdetails = {} as ICart;
  
              // Show success message only after the cart is cleared
              Swal.fire({
                title: "Cleared!",
                text: "Your cart has been cleared.",
                icon: "success",
                confirmButtonColor: "#00A63E",
                confirmButtonText: "OK"
              });
            }
          },
          error: (err) => {
            console.error(err);
  
            // Show error message only if the deletion fails
            Swal.fire({
              title: "Error!",
              text: "Failed to clear your cart. Please try again.",
              icon: "error",
              confirmButtonColor: "#d33",
              confirmButtonText: "Retry"
            });
          }
        });
      }
    });
  }
  
  ngOnInit(): void {
    this.GetCartData();
  }
}
