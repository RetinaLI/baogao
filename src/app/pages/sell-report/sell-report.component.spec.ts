import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SellReportComponent } from './sell-report.component';
import { SharedModule } from 'src/app/providors/share.module';
import { HttpModule } from '@angular/http';

let component: SellReportComponent;
let fixture: ComponentFixture<SellReportComponent>;
let page: Page;

describe('销售报告', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellReportComponent ],
      imports: [SharedModule, HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    createComponent();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('销量省份数据为空', () => {
    component.mapDataSell = [];
    fixture.detectChanges();
    expect(page.sellTopProvince.length).toBe(0);
  });
  it('有库存数据时', () => {
    let arr = [
      {
        name: '河北',
        value: 12
      },
      {
        name: '山东',
        value: 32
      },
      {
        name: '山西',
        value: 22
      }
    ];
    component.mapDataSell = arr;
    fixture.detectChanges();
    expect(page.sellTopProvince.length).toBe(3);
  });
  it('按品牌统计实销省份top3为空', () => {
    component.brandSellProvinceOrder = [];
    fixture.detectChanges();
    expect(page.brandSellProvinceOrderHtml.length).toBe(1);
  });
  it('按品牌统计实销省份top3有数据时', () => {
    let arr = [
      {
        name: '欧曼',
        provinces: ['山东', '山西', '河北']
      },
      {
        name: '欧曼',
        provinces: ['山东', '山西', '河北']
      },
      {
        name: '欧曼',
        provinces: ['山东', '山西', '河北']
      }
    ];
    component.brandSellProvinceOrder = arr;
    fixture.detectChanges();
    expect(page.brandSellProvinceOrderHtml.length).toBe(4);
  });
});

function createComponent() {
  fixture = TestBed.createComponent(SellReportComponent);
  component = fixture.componentInstance;
  page = new Page();
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    fixture.detectChanges();
  });
}

class Page {

  get sellTopProvince() { return this.queryAll<HTMLLIElement>('.sell-top-province .box>div');}
  get brandSellProvinceOrderHtml() {
    return this.queryAll<HTMLLIElement>('.brands-sell .table tr');
  }
  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }

  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }

  constructor() {

  };
}
