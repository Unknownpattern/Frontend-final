import { Router } from '@angular/router';
import { getUser } from './../../auth/state/auth.selector';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { adminLoadItem, adminLoadUsers } from '../state/admin.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSub!: Subscription;
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(adminLoadUsers());
    this.store.dispatch(adminLoadItem());
    this.userSub = this.store.select(getUser).subscribe((value) => {
      if (!value?.isAdmin) {
        this.router.navigateByUrl('/auth/login');
      }
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
