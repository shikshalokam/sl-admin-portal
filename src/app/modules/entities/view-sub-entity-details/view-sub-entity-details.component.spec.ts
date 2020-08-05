import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubEntityDetailsComponent } from './view-sub-entity-details.component';

describe('ViewSubEntityDetailsComponent', () => {
  let component: ViewSubEntityDetailsComponent;
  let fixture: ComponentFixture<ViewSubEntityDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSubEntityDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubEntityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
