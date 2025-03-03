  import { CartService } from './../../core/services/cart/cart.service';
  import { Component, OnInit } from '@angular/core';
  import { ProductsService } from '../../core/services/products/products.service';
  import { IProduct } from '../../shared/interfaces/iproduct';
  import { RouterLink } from '@angular/router';
  import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'app-products',
  imports: [ RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private ngxSpinnerService: NgxSpinnerService,
    private toastrService: ToastrService,

  ) {}

  Products:IProduct[] = [];
GetAllProductsData():void{
  this.ngxSpinnerService.show()
  this.productsService.GetALLProducts().subscribe({
    next:(res)=>{
      this.Products = res.data
      this.ngxSpinnerService.hide()

    },
    error: (err) => {
      console.error('Error fetching categories:', err);

    }
  })
}

  ngOnInit(): void {
      this.GetAllProductsData();
  }

  AddtoCart( id:string ):void{
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
