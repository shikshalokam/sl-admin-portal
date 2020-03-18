import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiUsersComponent } from './multi-users.component';

describe('MultiUsersComponent', () => {
  let component: MultiUsersComponent;
  let fixture: ComponentFixture<MultiUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
