import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticReportComponent } from './logistic-report.component';
import { SharedModule } from 'src/app/providors/share.module';
import { HttpModule } from '@angular/http';

describe('LogisticReportComponent', () => {
  let component: LogisticReportComponent;
  let fixture: ComponentFixture<LogisticReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogisticReportComponent ],
      imports: [SharedModule, HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
