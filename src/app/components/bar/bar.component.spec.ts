import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { BarComponent } from './bar.component';
import { By } from '@angular/platform-browser';

describe('测试Bar-echart组件', () => {
  let component: BarComponent;
  let fixture: ComponentFixture<BarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('当没有数据传入时候', () => {
    component._data = [];
    const chartName = fixture.debugElement.query(By.css('div'));
    expect(chartName.attributes['id']).toBe('bar-chart');
  });


  it('当给柱状图传入数据是，页面正常显示测试', () => {
    component._data = [
      {date: '周一', number: [162,34]},
      {date: '周二', number: [162,34]},
      {date: '周三', number: [162,34]},
      {date: '周四', number: [162,34]},
      {date: '周五', number: [162,34]},
      {date: '周六', number: [162,34]}
    ];

    const chartName = fixture.debugElement.query(By.css('div'));
    expect(chartName.attributes['id']).toBe('bar-chart');
    // expect(chartName.nativeElement.style.height).toBeGreaterThan(0);

  });
});
