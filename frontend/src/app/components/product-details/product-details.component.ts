import { Component } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  product!: Product;

  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute){}

  ngOnInit(): void{
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {
    const id: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(id).subscribe(
      data =>{
        this.product = data;
      }
    )
  }

  addToCart(){
    const cartItem = new CartItem(this.product);
    this.cartService.addToCart(cartItem);
  }
}
