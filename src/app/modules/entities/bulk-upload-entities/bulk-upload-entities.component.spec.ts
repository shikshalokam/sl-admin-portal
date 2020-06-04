import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadEntitiesComponent } from './bulk-upload-entities.component';

describe('BulkUploadEntitiesComponent', () => {
  let component: BulkUploadEntitiesComponent;
  let fixture: ComponentFixture<BulkUploadEntitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkUploadEntitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkUploadEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
