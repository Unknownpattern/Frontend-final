import { map, of, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getAllItems } from '../state/admin.selector';
import { AdminItem } from 'src/app/models/adminData.model';
import { setMessage } from 'src/app/shared/state/shared.actions';
import { adminDeleteItem } from '../state/admin.actions';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css'],
})
export class ShowDetailComponent implements OnInit, OnDestroy {
  isDeleted = false;
  id!: number;
  routeSub!: Subscription;
  itemSub!: Subscription;
  currentItem!: AdminItem;
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.itemSub = this.store
          .select(getAllItems)
          .pipe(
            map((items: AdminItem[]) => {
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
            } else {
              if (!this.isDeleted) {
                this.store.dispatch(
                  setMessage({ message: 'error loading selected item' })
                );
              }
            }
          });
      }
    });
  }

  onDelete() {
    this.isDeleted = true;
    this.store.dispatch(adminDeleteItem({ id: this.id }));
    this.router.navigateByUrl('/admin/dashboard');
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.itemSub.unsubscribe();
  }
}
