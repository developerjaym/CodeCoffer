import { TestBed } from '@angular/core/testing';

import { RemoteImportService } from './remote-import.service';

describe('RemoteImportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemoteImportService = TestBed.get(RemoteImportService);
    expect(service).toBeTruthy();
  });
});
