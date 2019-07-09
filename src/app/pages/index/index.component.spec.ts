import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import { SharedModule } from 'src/app/providors/share.module';
import { HttpClientModule } from '@angular/HttpClient';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexComponent ],
      imports: [SharedModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
