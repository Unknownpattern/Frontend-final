import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayListsComponent } from './display-lists.component';

describe('DisplayListsComponent', () => {
  let component: DisplayListsComponent;
  let fixture: ComponentFixture<DisplayListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
