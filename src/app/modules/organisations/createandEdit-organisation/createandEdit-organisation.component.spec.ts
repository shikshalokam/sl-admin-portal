import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateandEditOrganisationComponent } from './createandEdit-organisation.component';

describe('CreateOrganisationComponent', () => {
  let component: CreateandEditOrganisationComponent;
  let fixture: ComponentFixture<CreateandEditOrganisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateandEditOrganisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateandEditOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
