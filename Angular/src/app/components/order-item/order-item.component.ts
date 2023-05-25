import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  @Input() filteredOrders: any
  @Output() itemDeleted: EventEmitter<void> = new EventEmitter<void>();

  constructor(private orderService: OrdersService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  formatDate(dateString: string | null): string {

    if (dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    return '';
  }

  deleteOrder(id: string) {

    console.log(id)
    this.orderService.deleteOrder(id)
      .subscribe({
        next: () => {
          this.itemDeleted.emit();
          // console.log("emmiting event")
          // this.cdr.detectChanges();
          // this.ngOnInit()
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
}


