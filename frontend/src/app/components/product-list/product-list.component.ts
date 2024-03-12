import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService,
    private route: ActivatedRoute) {}

  products: Product[] =[];
  currentCategoryId: number = 1;
  isSearching: boolean = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProduct();
    });
  }

  listProduct() {

    this.isSearching = this.route.snapshot.paramMap.has('keyword');

    if(this.isSearching){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }

  }

  handleSearchProducts() {
    const searchKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    this.productService.searchProducts(searchKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleListProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }else{
      this.currentCategoryId = 1;
    }

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
