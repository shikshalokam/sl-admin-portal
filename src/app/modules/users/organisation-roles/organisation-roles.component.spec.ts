import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationRolesComponent } from './organisation-roles.component';

describe('OrganisationRolesComponent', () => {
  let component: OrganisationRolesComponent;
  let fixture: ComponentFixture<OrganisationRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
