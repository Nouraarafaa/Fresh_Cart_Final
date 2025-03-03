import { Subcategory } from './../../shared/interfaces/iproduct';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/Categories/categories.service';
import { Icategories } from '../../shared/interfaces/icategories';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  constructor(
    private categoriesService: CategoriesService,
    private ngxSpinnerService: NgxSpinnerService,
  ) {}
    Cardcategories: Icategories[] = [];
    // SubcategoryData: Subcategory[] = [];

  getCategoryData(): void {
    this.ngxSpinnerService.show()
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.Cardcategories = res.data;
        this.ngxSpinnerService.hide()

      },
      error: (err) => {
        console.error('Error fetching categories:', err);

      }
    });
  }
  ngOnInit(): void {
    this.getCategoryData();
  }
  }


