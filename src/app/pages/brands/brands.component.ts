import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/Categories/categories.service';
import { Brand } from '../../shared/interfaces/iproduct';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  Brands: Brand[] = [];
  constructor(
    private categoriesService: CategoriesService,
    private ngxSpinnerService: NgxSpinnerService
  ) {}
  getbrandsdata(): void {
    this.ngxSpinnerService.show()
    this.categoriesService.GetBrands().subscribe({
      next: (res) => {
        this.Brands = res.data;
        this.ngxSpinnerService.hide()

      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }


  ngOnInit(): void {
      this.getbrandsdata();
  }
}
