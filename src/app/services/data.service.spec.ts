import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientModule } from '@angular/HttpClient';
import { AjaxService } from './ajax.service';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService, AjaxService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
});
