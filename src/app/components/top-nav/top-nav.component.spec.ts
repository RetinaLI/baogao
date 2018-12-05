import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { TopNavComponent } from './top-nav.component';

describe('TopNavComponent', () => {
  let component: TopNavComponent;
  let fixture: ComponentFixture<TopNavComponent>;
  let De: DebugElement;
  let El: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavComponent);
    component = fixture.componentInstance;
    // component.bannerInfo = {
    //   title: '',
    //   platform: 'sell'
    // };
    // fixture.detectChanges();
    De = fixture.debugElement;
    El = De.nativeElement;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('bannerInfo should to be object', () => {
    component.bannerInfo = {
      className: "qe",
      currentTime: "2018.09.11 22:22:22",
      endDate: "2018.11.25",
      platform: "福田车联网平台",
      startDate: "2018.11.19",
      title: "质量大数据报告"
    };
    fixture.detectChanges();
    let bannerInfo = component.bannerInfo;
    let bannerInfoType = Object.prototype.toString.call(bannerInfo) === '[object Object]';
    expect(bannerInfoType).toBeTruthy();
  });
});
