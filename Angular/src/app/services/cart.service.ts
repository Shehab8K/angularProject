import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private totalSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private cartItems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public total$ = this.totalSubject.asObservable();
  public cartItems$: Observable<any[]> = this.cartItems.asObservable();

  updateTotal(totalPrice: number) {
    this.totalSubject.next(totalPrice);
  }

  public updateCartItems(items: any[]): void {
    this.cartItems.next(items);
  }
}
