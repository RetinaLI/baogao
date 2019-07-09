import { TestBed, inject } from '@angular/core/testing';

import { AjaxService } from './ajax.service';
import { HttpClientModule } from '@angular/HttpClient';

describe('AjaxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AjaxService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([AjaxService], (service: AjaxService) => {
    expect(service).toBeTruthy();
  }));
});
