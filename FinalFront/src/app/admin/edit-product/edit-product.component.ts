import { adminEditItem } from './../state/admin.actions';
import { AdminItem } from 'src/app/models/adminData.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getAllItems } from '../state/admin.selector';
import { setMessage } from 'src/app/shared/state/shared.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit, OnDestroy {
  id!: number;
  currentItem!: AdminItem;
  routeSub!: Subscription;
  itemSub!: Subscription;
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
      item_quantity: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
      item_description: [''],
    });
    this.dataSetUp();
  }

  dataSetUp() {
    this.routeSub = this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.itemSub = this.store
        .select(getAllItems)
        .pipe(
          map((items) => {
            const selectedItem = items.find((value) => {
              if (value.item_id) {
                return +value.item_id === +this.id;
              } else {
                return false;
              }
            });
            if (selectedItem) {
              return selectedItem;
            } else {
              return null;
            }
          })
        )
        .subscribe((value) => {
          if (value) {
            this.currentItem = value;
            this.itemName?.setValue(value.item_name);
            this.itemPrice?.setValue(value.item_price);
            this.itemDescription?.setValue(value.item_description);
            this.itemOriginalQuantity?.setValue(value.item_original_quantity);
            this.itemQuantity?.setValue(value.item_quantity);
          } else {
            this.store.dispatch(
              setMessage({ message: 'error loading selected item' })
            );
          }
        });
    });
  }
  onSave() {
    if (this.itemForm.valid) {
      let newObj = this.itemForm.value;
      newObj['item_id'] = this.id;
      this.store.dispatch(adminEditItem({ item: newObj }));
      this.router.navigate(['../..', 'ViewDetail', this.id], {
        relativeTo: this.activatedRoute,
      });
    }
  }
  onCancel() {
    this.router.navigate(['../..', 'ViewDetail', this.id], {
      relativeTo: this.activatedRoute,
    });
  }
  get itemName() {
    return this.itemForm.get('item_name');
  }
  get itemPrice() {
    return this.itemForm.get('item_price');
  }
  get itemQuantity() {
    return this.itemForm.get('item_quantity');
  }
  get itemOriginalQuantity() {
    return this.itemForm.get('item_original_quantity');
  }
  get itemDescription() {
    return this.itemForm.get('item_description');
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.itemSub.unsubscribe();
  }
}
