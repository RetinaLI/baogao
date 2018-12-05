import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QeComponent } from './qe.component';
import { SharedModule } from 'src/app/providors/share.module';
import { HttpModule } from '@angular/http';

describe('QeComponent', () => {
  let component: QeComponent;
  let fixture: ComponentFixture<QeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QeComponent ],
      imports: [SharedModule, HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
