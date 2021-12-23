import { getPageNumber } from './home/state/home.selector';
import { autoLogin } from './auth/state/auth.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { HomeLoadProducts } from './home/state/home.actions';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  pageSize = 10;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(autoLogin());
    this.store
      .select(getPageNumber)
      .pipe(first())
      .subscribe((value) => {
        this.store.dispatch(
          HomeLoadProducts({ page: value, pageSize: this.pageSize })
        );
      });
  }
}
