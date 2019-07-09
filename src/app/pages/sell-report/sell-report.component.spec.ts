import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SellReportComponent } from './sell-report.component';
import { SharedModule } from 'src/app/providors/share.module';
import { HttpClientModule } from '@angular/HttpClient';
import { By } from '@angular/platform-browser';
import { ISellReportData } from 'src/app/services/data.interface'

let component: SellReportComponent;
let fixture: ComponentFixture<SellReportComponent>;
let page: Page;
let cd: any;

describe('销售报告', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SellReportComponent],
      imports: [SharedModule, HttpClientModule]
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

  it('初始化属性检测', () => {
    expect(component.bannerInfo).toEqual({
      title: '销售大数据报告',
      platform: '福田车联网平台',
      startDate: '',
      endDate: '',
      currentTime: ''
    });
  });

  describe('没有数据时的页面展示', () => {
    it('报告生成时间为空', () => {
      expect(page.reportCreatedTime.textContent.trim()).toEqual('报告生成时间:');
    });
    it('销量省份数据为空', () => {
      component.mapDataSell = [];
      fixture.detectChanges();
      expect(page.sellTopProvince.length).toBe(0);
    });
    it('按品牌统计实销省份top3为空', () => {
      component.brandSellProvinceOrder = [];
      fixture.detectChanges();
      expect(page.brandSellProvinceOrderHtml.length).toBe(1);
    });
    it('按省份统计车辆实际库存为空', () => {
      component.mapDataRepertory = [];
      fixture.detectChanges();
      expect(page.provinceRepertoryHtml.length).toBe(0);
    });
    it('按品牌车辆实际库存占比为空', () => {
      component.parts.repertory.brandRepertoryRatyData = [];
      fixture.detectChanges();
      expect(page.brandRepertoryRatyHtml).toBe(null);
    });
    it('按品牌车辆实际库存占比为空', () => {
      component.parts.realSell.platformRealSell = [];
      fixture.detectChanges();
      expect(page.brandFaultRealRepertoryHtml.length).toBe(0);
    });
  });

  describe('有数据时的页面', () => {
    beforeEach(() => {
      component.dataService.reportData = {
        "currentTime": 1541552023754,
        "saleRankJson": {
          "mapList": [{
            "brandOrType": "奥铃",
            "provinceRank": [{
              "province": "北京市",
              "value": 74
            }, {
              "province": "山东省",
              "value": 48
            }, {
              "province": "河北省",
              "value": 37
            }, {
              "province": "四川省",
              "value": 35
            }, {
              "province": "广东省",
              "value": 33
            }, {
              "province": "河南省",
              "value": 30
            }, {
              "province": "湖北省",
              "value": 18
            }, {
              "province": "江苏省",
              "value": 17
            }, {
              "province": "辽宁省",
              "value": 16
            }, {
              "province": "上海市",
              "value": 14
            }, {
              "province": "陕西省",
              "value": 11
            }, {
              "province": "福建省",
              "value": 11
            }, {
              "province": "浙江省",
              "value": 10
            }, {
              "province": "云南省",
              "value": 9
            }, {
              "province": "广西壮族自治区",
              "value": 9
            }, {
              "province": "安徽省",
              "value": 9
            }, {
              "province": "江西省",
              "value": 7
            }, {
              "province": "湖南省",
              "value": 7
            }, {
              "province": "贵州省",
              "value": 5
            }, {
              "province": "海南省",
              "value": 5
            }, {
              "province": "山西省",
              "value": 4
            }, {
              "province": "重庆市",
              "value": 4
            }, {
              "province": "黑龙江省",
              "value": 3
            }, {
              "province": "吉林省",
              "value": 3
            }, {
              "province": "新疆维吾尔自治区",
              "value": 2
            }, {
              "province": "甘肃省",
              "value": 1
            }, {
              "province": "内蒙古自治区",
              "value": 1
            }, {
              "province": "青海省",
              "value": 1
            }, {
              "province": "宁夏回族自治区",
              "value": 1
            }]
          }, {
            "brandOrType": "时代",
            "provinceRank": [{
              "province": "河南省",
              "value": 35
            }, {
              "province": "广东省",
              "value": 14
            }, {
              "province": "江西省",
              "value": 13
            }, {
              "province": "江苏省",
              "value": 8
            }, {
              "province": "山东省",
              "value": 8
            }, {
              "province": "浙江省",
              "value": 7
            }, {
              "province": "吉林省",
              "value": 6
            }, {
              "province": "安徽省",
              "value": 6
            }, {
              "province": "河北省",
              "value": 3
            }, {
              "province": "辽宁省",
              "value": 2
            }, {
              "province": "福建省",
              "value": 1
            }, {
              "province": "湖南省",
              "value": 1
            }, {
              "province": "新疆维吾尔自治区",
              "value": 1
            }, {
              "province": "四川省",
              "value": 1
            }, {
              "province": "青海省",
              "value": 1
            }, {
              "province": "黑龙江省",
              "value": 1
            }, {
              "province": "陕西省",
              "value": 1
            }]
          }, {
            "brandOrType": "欧曼",
            "provinceRank": [{
              "province": "河北省",
              "value": 230
            }, {
              "province": "山东省",
              "value": 222
            }, {
              "province": "河南省",
              "value": 172
            }, {
              "province": "山西省",
              "value": 82
            }, {
              "province": "浙江省",
              "value": 76
            }, {
              "province": "安徽省",
              "value": 53
            }, {
              "province": "江苏省",
              "value": 50
            }, {
              "province": "湖北省",
              "value": 41
            }, {
              "province": "黑龙江省",
              "value": 38
            }, {
              "province": "福建省",
              "value": 38
            }, {
              "province": "江西省",
              "value": 37
            }, {
              "province": "辽宁省",
              "value": 29
            }, {
              "province": "广东省",
              "value": 29
            }, {
              "province": "北京市",
              "value": 28
            }, {
              "province": "新疆维吾尔自治区",
              "value": 22
            }, {
              "province": "四川省",
              "value": 22
            }, {
              "province": "上海市",
              "value": 21
            }, {
              "province": "天津市",
              "value": 18
            }, {
              "province": "贵州省",
              "value": 17
            }, {
              "province": "重庆市",
              "value": 17
            }, {
              "province": "内蒙古自治区",
              "value": 14
            }, {
              "province": "云南省",
              "value": 14
            }, {
              "province": "陕西省",
              "value": 12
            }, {
              "province": "海南省",
              "value": 12
            }, {
              "province": "吉林省",
              "value": 10
            }, {
              "province": "甘肃省",
              "value": 9
            }, {
              "province": "广西壮族自治区",
              "value": 8
            }, {
              "province": "宁夏回族自治区",
              "value": 6
            }, {
              "province": "西藏自治区",
              "value": 5
            }, {
              "province": "湖南省",
              "value": 1
            }]
          }, {
            "brandOrType": "欧马可",
            "provinceRank": [{
              "province": "山东省",
              "value": 71
            }, {
              "province": "河北省",
              "value": 47
            }, {
              "province": "上海市",
              "value": 43
            }, {
              "province": "河南省",
              "value": 39
            }, {
              "province": "北京市",
              "value": 36
            }, {
              "province": "广东省",
              "value": 35
            }, {
              "province": "浙江省",
              "value": 35
            }, {
              "province": "江苏省",
              "value": 30
            }, {
              "province": "天津市",
              "value": 23
            }, {
              "province": "辽宁省",
              "value": 16
            }, {
              "province": "安徽省",
              "value": 11
            }, {
              "province": "四川省",
              "value": 9
            }, {
              "province": "云南省",
              "value": 7
            }, {
              "province": "海南省",
              "value": 6
            }, {
              "province": "陕西省",
              "value": 5
            }, {
              "province": "广西壮族自治区",
              "value": 4
            }, {
              "province": "福建省",
              "value": 4
            }, {
              "province": "吉林省",
              "value": 3
            }, {
              "province": "贵州省",
              "value": 3
            }, {
              "province": "新疆维吾尔自治区",
              "value": 2
            }, {
              "province": "宁夏回族自治区",
              "value": 1
            }, {
              "province": "黑龙江省",
              "value": 1
            }, {
              "province": "湖北省",
              "value": 1
            }, {
              "province": "江西省",
              "value": 1
            }, {
              "province": "湖南省",
              "value": 1
            }]
          }, {
            "brandOrType": "瑞沃",
            "provinceRank": [{
              "province": "北京市",
              "value": 10
            }, {
              "province": "江苏省",
              "value": 7
            }, {
              "province": "山东省",
              "value": 5
            }, {
              "province": "河北省",
              "value": 5
            }, {
              "province": "河南省",
              "value": 4
            }, {
              "province": "黑龙江省",
              "value": 3
            }, {
              "province": "安徽省",
              "value": 3
            }, {
              "province": "湖北省",
              "value": 2
            }, {
              "province": "广东省",
              "value": 2
            }, {
              "province": "吉林省",
              "value": 1
            }, {
              "province": "浙江省",
              "value": 1
            }, {
              "province": "湖南省",
              "value": 1
            }, {
              "province": "江西省",
              "value": 1
            }]
          }],
          "desc": "统计经销商实销车辆排名"
        },
        "carSalesJson": {
          "mapList": [{
            "province": "山东省",
            "value": 355
          }, {
            "province": "河北省",
            "value": 327
          }, {
            "province": "河南省",
            "value": 289
          }, {
            "province": "北京市",
            "value": 158
          }, {
            "province": "浙江省",
            "value": 140
          }, {
            "province": "广东省",
            "value": 129
          }, {
            "province": "江苏省",
            "value": 112
          }, {
            "province": "山西省",
            "value": 99
          }, {
            "province": "安徽省",
            "value": 83
          }, {
            "province": "上海市",
            "value": 78
          }, {
            "province": "湖北省",
            "value": 70
          }, {
            "province": "四川省",
            "value": 67
          }, {
            "province": "辽宁省",
            "value": 63
          }, {
            "province": "江西省",
            "value": 59
          }, {
            "province": "福建省",
            "value": 54
          }, {
            "province": "黑龙江省",
            "value": 46
          }, {
            "province": "天津市",
            "value": 41
          }, {
            "province": "云南省",
            "value": 30
          }, {
            "province": "陕西省",
            "value": 29
          }, {
            "province": "新疆维吾尔自治区",
            "value": 27
          }, {
            "province": "贵州省",
            "value": 25
          }, {
            "province": "重庆市",
            "value": 24
          }, {
            "province": "吉林省",
            "value": 23
          }, {
            "province": "海南省",
            "value": 23
          }, {
            "province": "广西壮族自治区",
            "value": 21
          }, {
            "province": "内蒙古自治区",
            "value": 15
          }, {
            "province": "湖南省",
            "value": 11
          }, {
            "province": "甘肃省",
            "value": 11
          }, {
            "province": "宁夏回族自治区",
            "value": 8
          }, {
            "province": "西藏自治区",
            "value": 5
          }, {
            "province": "青海省",
            "value": 2
          }],
          "totalNum": 2424,
          "desc": "按省统计经销商实销车辆数"
        },
        "reportDate": {
          "endDate": "2018/10/21",
          "startDate": "2018/10/15"
        },
        "stockRankJson": {
          "mapList": [{
            "brandOrType": "欧曼",
            "value": 9291
          }, {
            "brandOrType": "欧马可",
            "value": 3831
          }, {
            "brandOrType": "奥铃",
            "value": 1758
          }, {
            "brandOrType": "瑞沃",
            "value": 486
          }, {
            "brandOrType": "时代",
            "value": 397
          }, {
            "brandOrType": "雷萨",
            "value": 135
          }],
          "total": 15898,
          "desc": "按品牌或者车型查询库存排名情况"
        },
        "noSaleJson": {
          "mapList": [{
            "actualSalesNum": 7800,
            "totalNum": 558068
          }, {
            "lastActualSalesNum": 7800,
            "lastTotalNum": 558068
          }, {
            "weekAddActualNum": 0,
            "weekAddTotalNum": 0
          }],
          "desc": "查询车辆未实销预警情况"
        },
        "noSaleInfoJson": {
          "mapList": [{
            "actualSalesNum": 25,
            "totalNum": 63,
            "brandOrType": "伽途"
          }, {
            "actualSalesNum": 0,
            "totalNum": 2,
            "brandOrType": "图雅诺"
          }, {
            "actualSalesNum": 822,
            "totalNum": 24727,
            "brandOrType": "奥铃"
          }, {
            "actualSalesNum": 0,
            "totalNum": 16062,
            "brandOrType": "工程车"
          }, {
            "actualSalesNum": 0,
            "totalNum": 1,
            "brandOrType": "拓路者"
          }, {
            "actualSalesNum": 747,
            "totalNum": 8299,
            "brandOrType": "时代"
          }, {
            "actualSalesNum": 4572,
            "totalNum": 455412,
            "brandOrType": "欧曼"
          }, {
            "actualSalesNum": 996,
            "totalNum": 32182,
            "brandOrType": "欧马可"
          }, {
            "actualSalesNum": 408,
            "totalNum": 9944,
            "brandOrType": "瑞沃"
          }, {
            "actualSalesNum": 0,
            "totalNum": 3,
            "brandOrType": "萨普"
          }, {
            "actualSalesNum": 230,
            "totalNum": 11361,
            "brandOrType": "雷萨"
          }, {
            "actualSalesNum": 0,
            "totalNum": 12,
            "brandOrType": "风景"
          }],
          "desc": "按品牌或者车型车辆未实销预警情况"
        },
        "realSaleJson": {
          "mapList": [{
            "actualSalesNum": 179734,
            "totalNum": 218380
          }, {
            "lastActualSalesNum": 179734,
            "lastTotalNum": 218380
          }, {
            "weekAddActualNum": 0,
            "weekAddTotalNum": 0
          }],
          "desc": "查询车辆实销预警情况"
        },
        "realSaleInfoJson": {
          "mapList": [{
            "actualSalesNum": 3,
            "totalNum": 19,
            "brandOrType": "伽途"
          }, {
            "actualSalesNum": 1,
            "totalNum": 1,
            "brandOrType": "图雅诺"
          }, {
            "actualSalesNum": 1220,
            "totalNum": 6215,
            "brandOrType": "奥铃"
          }, {
            "actualSalesNum": 6,
            "totalNum": 25,
            "brandOrType": "工程车"
          }, {
            "actualSalesNum": 494,
            "totalNum": 1419,
            "brandOrType": "时代"
          }, {
            "actualSalesNum": 1,
            "totalNum": 1,
            "brandOrType": "普罗科"
          }, {
            "actualSalesNum": 155592,
            "totalNum": 173486,
            "brandOrType": "欧曼"
          }, {
            "actualSalesNum": 15815,
            "totalNum": 16901,
            "brandOrType": "欧辉"
          }, {
            "actualSalesNum": 1219,
            "totalNum": 7182,
            "brandOrType": "欧马可"
          }, {
            "actualSalesNum": 252,
            "totalNum": 1022,
            "brandOrType": "瑞沃"
          }, {
            "actualSalesNum": 4852,
            "totalNum": 11819,
            "brandOrType": "雷萨"
          }, {
            "actualSalesNum": 278,
            "totalNum": 288,
            "brandOrType": "风景"
          }],
          "desc": "按品牌或者车型车辆实销预警情况"
        },
        "stockCountJson": {
          "mapList": [{
            "province": "山东省",
            "value": 2105
          }, {
            "province": "北京市",
            "value": 1894
          }, {
            "province": "河北省",
            "value": 1877
          }, {
            "province": "河南省",
            "value": 1536
          }, {
            "province": "江苏省",
            "value": 1055
          }, {
            "province": "广东省",
            "value": 933
          }, {
            "province": "安徽省",
            "value": 642
          }, {
            "province": "浙江省",
            "value": 604
          }, {
            "province": "四川省",
            "value": 444
          }, {
            "province": "山西省",
            "value": 434
          }, {
            "province": "陕西省",
            "value": 425
          }, {
            "province": "辽宁省",
            "value": 383
          }, {
            "province": "江西省",
            "value": 347
          }, {
            "province": "上海市",
            "value": 325
          }, {
            "province": "福建省",
            "value": 312
          }, {
            "province": "湖北省",
            "value": 281
          }, {
            "province": "新疆维吾尔自治区",
            "value": 273
          }, {
            "province": "贵州省",
            "value": 256
          }, {
            "province": "天津市",
            "value": 243
          }, {
            "province": "内蒙古自治区",
            "value": 218
          }, {
            "province": "黑龙江省",
            "value": 208
          }, {
            "province": "云南省",
            "value": 158
          }, {
            "province": "湖南省",
            "value": 155
          }, {
            "province": "广西壮族自治区",
            "value": 145
          }, {
            "province": "重庆市",
            "value": 122
          }, {
            "province": "宁夏回族自治区",
            "value": 88
          }, {
            "province": "西藏自治区",
            "value": 76
          }, {
            "province": "吉林省",
            "value": 70
          }, {
            "province": "甘肃省",
            "value": 55
          }, {
            "province": "海南省",
            "value": 55
          }, {
            "province": "青海省",
            "value": 17
          }],
          "total": 15736,
          "desc": "各省车辆库存情况"
        },
        "type": "carBrand",
        "platform": "福田汽车车联网平台"
      } as ISellReportData;
      component.dataService.renderReportData();
      component.reportData = component.dataService.reportData as ISellReportData;
      cd = component.reportData;
      fixture.detectChanges();
    });
    it('库存有数据时显示正常', () => {
      let d = cd.carSalesJson.mapList;
      d = convertArrJsonName(d, 'province').sort((a, b) => b.value - a.value);
      d = convertProvinceName(d);
      component.mapDataSell = d;
      fixture.detectChanges();
      expect(page.sellTopProvince.length).toBe(10);
    });
    it('按品牌统计实销省份top3有数据时显示正常', () => {
      let d = cd.saleRankJson.mapList;
      let brandOrder1 = ['欧曼', '欧马可', '奥铃', '时代', '瑞沃', '雷萨'];
      d = brandOrder1.map(v => {
        let obj = {
          name: '',
          provinces: []
        };

        let item = d.filter(a => a.brandOrType === v)[0];
        if (item) {
          obj.name = v;
          obj.provinces = item.provinceRank.sort((a, b) => b.value - a.value).slice(0, 3);
          return obj;
        } else {
          return null;
        }
      }).filter(v => v);
      component.brandSellProvinceOrder = d;
      fixture.detectChanges();
      expect(page.brandSellProvinceOrderHtml.length).toBe(d.length + 1);
    });
    it('按省份统计车辆实际库存正常', () => {
      let d = cd.stockCountJson.mapList;
      d = convertArrJsonName(d, 'province').sort((a, b) => b.value - a.value);
      d = convertProvinceName(d);
      component.mapDataRepertory = d;
      fixture.detectChanges();
      expect(page.provinceRepertoryHtml.length).toBe(10);
    });
    it('按品牌车辆实际库存占比为空', () => {
      let d = cd.stockRankJson.mapList;
      let brandOrder2 = ['欧曼', '欧马可', '奥铃', '瑞沃'];
      let data = [];
      let obj = { name: '其他', value: 0};
      d = convertArrJsonName(d, 'brandOrType')
      d.forEach(v => {
        if(brandOrder2.indexOf(v.name) > -1) {
          data.push(v);
        }else {
          obj.value += v.value;
        }
      });
      data.push(obj);
      component.parts.repertory.brandRepertoryRatyData = data;
      fixture.detectChanges();
      expect(page.pieListTrHtml.length).toBe(brandOrder2.length + 1);
    });
    it('按品牌车辆实际库存占比为空', () => {
      let d1 = cd.realSaleInfoJson.mapList;
      let d2 = cd.noSaleInfoJson.mapList;
      let brandOrder = ['欧曼', '欧马可', '奥铃', '时代', '瑞沃', '雷萨'];
      d1 = convertArrJsonName(d1, 'brandOrType');
      d2 = convertArrJsonName(d2, 'brandOrType');
      let arr = [];
      brandOrder.forEach(v => {
        let saleRaty = 0;
        let repertoryRaty = 0;
        let saleItem = d1.find(x => x.name === v);
        let repertoryItem = d2.find(x => x.name === v);
        saleRaty = saleItem.actualSalesNum/saleItem.totalNum;
        repertoryRaty = repertoryItem.actualSalesNum/repertoryItem.totalNum;
        arr.push({
          name: v,
          saleRaty,
          repertoryRaty
        })
      });
      component.parts.realSell.platformRealSell = arr;
      fixture.detectChanges();
      expect(page.brandFaultRealRepertoryHtml.length).toBe(brandOrder.length);
    });
  })
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
// 改字段名
function convertArrJsonName(json: {}[], oldName: string, newName: string = 'name') {
  return JSON.parse(JSON.stringify(json).replace(eval(`/${oldName}/g`), newName));
}
// 改省份名
function convertProvinceName(data: {}[]) {
  return JSON.parse(JSON.stringify(data).replace(eval(`/[省|市|自治区|壮族自治区|回族自治区|维吾尔自治区|特别行政区]/g`), ''));
}
class Page {
  get reportCreatedTime() {
    return this.query<HTMLLIElement>('.top-nav .time');
  }
  get sellTopProvince() { return this.queryAll<HTMLLIElement>('.sell-top-province .box>div'); }
  get brandSellProvinceOrderHtml() {
    return this.queryAll<HTMLLIElement>('.brands-sell .table tr');
  }
  get provinceRepertoryHtml() {
    return this.queryAll<HTMLLIElement>('.repertory-province .box>div');
  }
  get brandRepertoryRatyHtml() {
    return this.query<HTMLLIElement>('.brand-repertory');
  }
  get brandFaultRealRepertoryHtml() {
    return this.queryAll<HTMLLIElement>('.platform-sell .charts>div');
  }

  get pieListTrHtml() {
    return this.queryAll<HTMLElement>('.pie-list .list tr')
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
