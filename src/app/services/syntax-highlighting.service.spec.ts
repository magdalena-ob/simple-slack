import { TestBed } from '@angular/core/testing';

import { SyntaxHighlightingService } from './syntax-highlighting.service';

describe('SyntaxHighlightingService', () => {
  let service: SyntaxHighlightingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyntaxHighlightingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
