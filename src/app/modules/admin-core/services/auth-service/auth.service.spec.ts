import { TestBed } from '@angular/core/testing';

import { keyCloakService } from './auth.service';

describe('keyCloakService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: keyCloakService = TestBed.get(keyCloakService);
    expect(service).toBeTruthy();
  });
});
