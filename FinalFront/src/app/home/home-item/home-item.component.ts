import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HomeItem } from 'src/app/models/homeData.model';

@Component({
  selector: 'app-home-item',
  templateUrl: './home-item.component.html',
  styleUrls: ['./home-item.component.css'],
})
export class HomeItemComponent implements OnInit {
  quantityAvailable!: number;
  quantityValue = 0;
  @Input() product!: HomeItem;
  @Input() isLoggedIn!: Boolean;
  @Output() onAdd = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    this.quantityAvailable =
      this.product.item_quantity > 10 ? 10 : this.product.item_quantity;
    this.quantityValue = this.quantityAvailable > 0 ? 1 : 0;
  }
  onClick() {
    this.onAdd.emit({ amount: this.quantityValue, id: this.product.item_id });
  }
}
