import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  shopingCart: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: CartItem){

    let isInCart: boolean = false;
    let existingItem: CartItem | undefined = undefined;

    if(this.shopingCart.length > 0){
      existingItem = this.shopingCart.find( shopingCartItem => cartItem.id === shopingCartItem.id, isInCart = true);
    }

    if(isInCart && existingItem != undefined){
      existingItem.quantity++;
    }else{
      this.shopingCart.push(cartItem);
    }

    this.cartTotals();
  }

  cartTotals() {
    let totalPrice: number = 0;
    let totalQuantity: number = 0;

    for(let shopingCartItem of this.shopingCart){
      totalPrice += shopingCartItem.quantity * shopingCartItem.unitPrice;
      totalQuantity += shopingCartItem.quantity;
    }

    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);
  }
}
