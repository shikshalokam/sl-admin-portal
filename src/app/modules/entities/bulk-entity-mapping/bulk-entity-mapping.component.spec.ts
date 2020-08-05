import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkEntityMappingComponent } from './bulk-entity-mapping.component';

describe('BulkEntityMappingComponent', () => {
  let component: BulkEntityMappingComponent;
  let fixture: ComponentFixture<BulkEntityMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkEntityMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkEntityMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
