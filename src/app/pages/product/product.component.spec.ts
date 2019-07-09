import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { SharedModule } from 'src/app/providors/share.module';
import { HttpClientModule } from '@angular/HttpClient';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      imports: [SharedModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
