import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEntityDetailsComponent } from './view-entity-details.component';

describe('ViewEntityDetailsComponent', () => {
  let component: ViewEntityDetailsComponent;
  let fixture: ComponentFixture<ViewEntityDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEntityDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEntityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
