import { TestBed, inject } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/HttpClient';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService, {provide: APP_BASE_HREF, useValue: '/'}],
      imports: [HttpClientModule, RouterModule.forRoot([])]
    });
  });

  it('should be created', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));
});
