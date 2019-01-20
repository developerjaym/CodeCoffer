import { TestBed } from '@angular/core/testing';

import { ExportGuardService } from './export-guard.service';

describe('ExportGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExportGuardService = TestBed.get(ExportGuardService);
    expect(service).toBeTruthy();
  });
});
