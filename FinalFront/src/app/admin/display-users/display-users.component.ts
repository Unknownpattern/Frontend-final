import { getAllUsers } from './../state/admin.selector';
import { AdminUsers } from './../../models/adminData.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { adminLoadUsers } from '../state/admin.actions';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.css'],
})
export class DisplayUsersComponent implements OnInit {
  userList$!: Observable<AdminUsers[]>;
  columnNames = ['User Name', 'User Email'];
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userList$ = this.store.select(getAllUsers);
  }
}
