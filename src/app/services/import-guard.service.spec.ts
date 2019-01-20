import { TestBed } from '@angular/core/testing';

import { ImportGuardService } from './import-guard.service';

describe('ImportGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImportGuardService = TestBed.get(ImportGuardService);
    expect(service).toBeTruthy();
  });
});
