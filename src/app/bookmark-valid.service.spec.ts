import { TestBed } from '@angular/core/testing';

import { BookmarkValidService } from './bookmark-valid.service';

describe('BookmarkValidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookmarkValidService = TestBed.get(BookmarkValidService);
    expect(service).toBeTruthy();
  });
});
