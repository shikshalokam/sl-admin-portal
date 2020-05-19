import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadCrumComponent } from './bread-crum.component';

describe('BreadCrumComponent', () => {
  let component: BreadCrumComponent;
  let fixture: ComponentFixture<BreadCrumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadCrumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadCrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
