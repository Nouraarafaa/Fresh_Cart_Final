import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'] 
})
export class DetailsComponent implements OnInit {
  isLoadingDetails: boolean = false;
  private readonly activatedroute = inject(ActivatedRoute); 
  private readonly productservice = inject(ProductsService); 
  private readonly cartService = inject(CartService); 
  private readonly ngxSpinnerService = inject(NgxSpinnerService);
  private readonly toastrService = inject(ToastrService);
  

  detailsProduct:IProduct | null = null;

  ngOnInit():void {
    this.activatedroute.paramMap.subscribe({
      next:(param) => {
        let IdProduct = param.get('ItemId');
        this.ngxSpinnerService.show()
        this.productservice.GetSpecificProduct(IdProduct).subscribe({
          next: (res) => {
              this.detailsProduct = res.data;   
              this.ngxSpinnerService.hide()
          },
          error: (err) => {
              console.log(err);

          }
      });      
      },
      error:(err) => {
        console.log(err);
      }
    });
  }
  AddtoCart( id:string ):void{
    console.log(this.detailsProduct?.id)
    this.cartService.AddProduct(id).subscribe({
      next:(result)=>{
        if( result.status == 'success' ){
          this.toastrService.success(result.message)
        }

      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
}
