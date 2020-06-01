import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateEntityListComponent } from './state-entity-list.component';

describe('StateEntityListComponent', () => {
  let component: StateEntityListComponent;
  let fixture: ComponentFixture<StateEntityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateEntityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateEntityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
