import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService) {}

  products: Product[] =[];

  ngOnInit(): void {
    this.listProduct();
  }

  listProduct() {
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
