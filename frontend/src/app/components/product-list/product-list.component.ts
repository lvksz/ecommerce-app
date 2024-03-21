import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {



  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute) {}

  products: Product[] =[];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  isSearching: boolean = false;
  previousKeyword: string = "";

  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 5;

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

    if(this.previousKeyword != searchKeyword){
      this.pageNumber = 1;
    }
    this.previousKeyword = searchKeyword;

    this.productService.searchProducts(this.pageNumber - 1, this.pageSize,searchKeyword).subscribe(this.processResult());
  }

  handleListProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }else{
      this.currentCategoryId = 1;
    }

    if(this.previousCategoryId != this.currentCategoryId){
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListPage(this.pageNumber - 1, this.pageSize, this.currentCategoryId).subscribe(this.processResult());

  }

  addToCart(product: Product) {
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }

  updatePageSize(pageSize: string) {
    this.pageSize = +pageSize;
    this.pageNumber = 1;
    this.listProduct();
  }

  processResult(){
    return (data: any) => {
      this.products = data._embedded.products;
        this.pageNumber = data.page.number + 1;
        this.pageSize = data.page.size;
        this.totalElements = data.page.totalElements;
      }
    }
}

