import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LogisticReportComponent } from './logistic-report.component';
import { SharedModule } from 'src/app/providors/share.module';
import { HttpModule } from '@angular/http';
import { toBase64String } from '@angular/compiler/src/output/source_map';

let comp: LogisticReportComponent;
let fixture: ComponentFixture<LogisticReportComponent>;
let page: Page;

describe('物流报告页面测试', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogisticReportComponent ],
      imports: [SharedModule, HttpModule]
    })
    .compileComponents()
  }));

  beforeEach(() => {
    createComponent();
    // fixture = TestBed.createComponent(LogisticReportComponent);
    // comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  // it('组件AccountIfAddComponent没有传值，页面不显示', () => {
  //   comp.accountIfAddData = [];
  //   expect(page.accountWrapper.childNodes.length).toBe(1);
  // });

  // it('组件AccountIfAddComponent传入正确的数值，页面显示', () => {
  //   comp.accountIfAddData = [
  //     {name: '分公司', numberVal: 22},
  //     {name: '路线', numberVal: 1333}
  //   ]
  //   expect(page.accountWrapper.childNodes.length).toBe(2);
  // });


  it('物流资源情况，当新增数据为空时测试', () => {
    comp.plusData = [];
    fixture.detectChanges();
    expect(page.newAddNames.length).toBe(0);

  });

  it('物流资源情况，新增数据测试', () => {
    comp.plusData = [
      ['司机', '22名'],
      ['运输路线', '224条'],
      ['位置标点', '23个']
    ]
    fixture.detectChanges();
    expect(page.newAddNames.length).toBe(3);
    const firstVal = comp.plusData[0][1];
    expect(page.newAddVals[0].textContent).toBe('22名');
  });

  it('车辆运输概况，当没有数据时候测试', () => {
    comp.addData = {
      total: 0,
      totalAddNum: 0,
      ontimeBeginRate: 0,
      ontimeEndRate: 0,
      beginRateAdd: 0,
      endRateAdd: 0
    }
    fixture.detectChanges();
    expect(page.totalOrders.textContent).toBe('0单');
    expect(page.totalAdd.textContent).toBe(' 环比');
    expect(page.totalAddNum).toBeFalsy;

  })

  it('车辆运输概况，当传入数据正确时测试', () => {
    comp.addData = {
      beginRateAdd: 16.7,
      endRateAdd: 11.4,
      ontimeBeginRate: 35.6,
      ontimeEndRate: 35.6,
      total: 163,
      totalAddNum: 3859
    }
    comp.totalYundanM = -1;
    fixture.detectChanges();
    expect(page.totalOrders.textContent).toBe('163单');
    expect(page.totalAdd.textContent).toBe(' 环比减少');
    expect(page.totalAddNum.textContent).toBe('3859单');

  })

});

/** Create the component and set the `page` test variables */
function createComponent() {
  fixture = TestBed.createComponent(LogisticReportComponent);
  comp = fixture.componentInstance;
  page = new Page();
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    fixture.detectChanges();
  });
}

class Page {

  get newAddNames()     { return this.queryAll<HTMLLIElement>('.trans-resource .test1'); }
  get newAddVals() { return this.queryAll<HTMLLIElement>('.test2');}

  get totalOrders() { return this.query<HTMLLIElement>('.total');}
  get totalAdd() { return this.query<HTMLLIElement>('.total-add');}
  get totalAddNum() { return this.query<HTMLLIElement>('.total-add-num');}

  get accountWrapper() { return this.query<HTMLLIElement>('.total-info');}

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }

  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }

  constructor() {

  };
}

