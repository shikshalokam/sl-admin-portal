import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationEditModalComponent } from './organisation-edit-modal.component';

describe('OrganisationEditModalComponent', () => {
  let component: OrganisationEditModalComponent;
  let fixture: ComponentFixture<OrganisationEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
