import { TestBed } from '@angular/core/testing';

import { HotKeyService } from './hot-key.service';

describe('HotKeyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotKeyService = TestBed.get(HotKeyService);
    expect(service).toBeTruthy();
  });
});
