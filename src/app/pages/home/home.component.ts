import { CartService } from './../../core/services/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { CategoriesService } from '../../core/services/Categories/categories.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { Icategories } from '../../shared/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  imports:[ CarouselModule , RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  AllProducts: IProduct[] = [];
  categories: Icategories[] = [];

  customMainSlider: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplayTimeout:4000,
    autoplayHoverPause:true,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  };
  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 4 }
    },
    nav: true
  };

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private cartService: CartService,
    private toastrService: ToastrService,
    private ngxSpinnerService: NgxSpinnerService
  ) {}

  GetAllProductsData(): void {
    this.ngxSpinnerService.show()
    this.productsService.GetALLProducts().subscribe({
      next: (res) => {
        this.AllProducts = res.data;
        this.ngxSpinnerService.hide()
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });

  }

  getCategoryData(): void {
    this.ngxSpinnerService.show()
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        this.ngxSpinnerService.hide()
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  ngOnInit(): void {
    this.GetAllProductsData();
    this.getCategoryData();
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
