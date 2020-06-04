import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateandeditStateComponent } from './createandedit-state.component';

describe('CreateandeditStateComponent', () => {
  let component: CreateandeditStateComponent;
  let fixture: ComponentFixture<CreateandeditStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateandeditStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateandeditStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
