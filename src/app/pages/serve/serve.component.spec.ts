import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServeComponent } from './serve.component';
import { SharedModule } from 'src/app/providors/share.module';
import { HttpModule } from '@angular/http';

describe('ServeComponent', () => {
  let component: ServeComponent;
  let fixture: ComponentFixture<ServeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServeComponent ],
      imports: [SharedModule, HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
