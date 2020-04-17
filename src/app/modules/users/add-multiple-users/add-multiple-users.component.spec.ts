import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultipleUsersComponent } from './add-multiple-users.component';

describe('AddMultipleUsersComponent', () => {
  let component: AddMultipleUsersComponent;
  let fixture: ComponentFixture<AddMultipleUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMultipleUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMultipleUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
