import { TestBed, inject } from '@angular/core/testing';

import { AjaxService } from './ajax.service';
import { HttpModule } from '@angular/http';

describe('AjaxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AjaxService],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([AjaxService], (service: AjaxService) => {
    expect(service).toBeTruthy();
  }));
});
