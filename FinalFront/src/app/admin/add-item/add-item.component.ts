import { AdminItem } from 'src/app/models/adminData.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { setMessage } from 'src/app/shared/state/shared.actions';
import { adminAddItem } from '../state/admin.actions';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  itemForm!: FormGroup;
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      item_name: ['', Validators.required],
      item_price: [
        '',
        [
          Validators.required,
          Validators.pattern('^[+-]?([0-9]+.?[0-9]*|.[0-9]+)$'),
        ],
      ],
      item_original_quantity: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*')],
      ],
      item_description: [''],
    });
  }

  onSave() {
    if (this.itemForm.valid) {
      let newObj = this.itemForm.value as AdminItem;
      this.store.dispatch(adminAddItem({ item: newObj }));
      this.router.navigate(['../'], {
        relativeTo: this.activatedRoute,
      });
    }
  }
  onCancel() {
    this.router.navigate(['../'], {
      relativeTo: this.activatedRoute,
    });
  }
  get itemName() {
    return this.itemForm.get('item_name');
  }
  get itemPrice() {
    return this.itemForm.get('item_price');
  }
  get itemOriginalQuantity() {
    return this.itemForm.get('item_original_quantity');
  }
  get itemDescription() {
    return this.itemForm.get('item_description');
  }
}
