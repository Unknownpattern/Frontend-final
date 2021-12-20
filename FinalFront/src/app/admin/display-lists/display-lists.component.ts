import { AdminItem } from 'src/app/models/adminData.model';
import { getAllItems } from './../state/admin.selector';
import { adminLoadItem } from './../state/admin.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display-lists',
  templateUrl: './display-lists.component.html',
  styleUrls: ['./display-lists.component.css'],
})
export class DisplayListsComponent implements OnInit {
  itemList$!: Observable<AdminItem[]>;
  columnNames = ['Item name', 'Item Quantity'];
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.itemList$ = this.store.select(getAllItems);
  }
}
