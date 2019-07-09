import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LogisticReportComponent } from './logistic-report.component';
import { SharedModule } from 'src/app/providors/share.module';
import { HttpClientModule } from '@angular/HttpClient';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { ILogisticReportData } from '../../services/data.interface';

let comp: LogisticReportComponent;
let fixture: ComponentFixture<LogisticReportComponent>;
let page: Page;

describe('物流大数据报告页面测试', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogisticReportComponent ],
      imports: [SharedModule, HttpClientModule]
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

  it('初始化属性检测', () => {
    expect(comp.bannerInfo).toEqual({
      endDate: '',
      startDate: '',
      title: `物流大数据报告`,
      platform: '福田车联网平台',
      currentTime: ''
    });
  });

  it('报告生成时间为空', () => {
    expect(page.productTime.textContent.trim()).toEqual('报告生成时间:');
  });

  it('车联网物流资源情况全部显示为0', () => {
    let values = page.logisticResource.map($elem => {
      return $elem.nativeElement.textContent;
    });
    expect(values.join('')).toEqual('0'.repeat(values.length));
  });

  it('车联网物流资源情况（概述）全部显示为0', () => {
    let values = page.newAddNames.map($elem => {
      return $elem.nativeElement.textContent.replace(/[^\d]/g, '');
    });
    expect(values.join('')).toEqual('0'.repeat(values.length));
  });

  it('车辆运输概况（概述）全部显示为0', () => {
    let values = page.orders.map($elem => {
      return $elem.nativeElement.textContent.replace(/[^\d]/g, '');
    });
    expect(values.join('')).toEqual('0'.repeat(values.length));
  });

  describe('当获取到数据时，页面的显示', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(LogisticReportComponent);
      comp = fixture.componentInstance;
      comp.dataService.reportData = {
        "currentTime": 1543193212607,
        "transportationQualityEvaluation": {
          "driverGradeTop": [{
            "driverId": 582,
            "receiptNum": 14,
            "driverName": "毛福刚.3",
            "driverGrade": 100
          }, {
            "driverId": 3820,
            "receiptNum": 13,
            "driverName": "王启孕",
            "driverGrade": 100
          }, {
            "driverId": 3461,
            "receiptNum": 13,
            "driverName": "郑明文",
            "driverGrade": 100
          }, {
            "driverId": 1612,
            "receiptNum": 12,
            "driverName": "沈子乐",
            "driverGrade": 100
          }, {
            "driverId": 1147,
            "receiptNum": 12,
            "driverName": "姜燕春",
            "driverGrade": 100
          }, {
            "driverId": 365,
            "receiptNum": 9,
            "driverName": "陈杰",
            "driverGrade": 100
          }, {
            "driverId": 3223,
            "receiptNum": 7,
            "driverName": "孙夕田",
            "driverGrade": 100
          }, {
            "driverId": 2639,
            "receiptNum": 7,
            "driverName": "张连志",
            "driverGrade": 100
          }, {
            "driverId": 145,
            "receiptNum": 7,
            "driverName": "丁元果",
            "driverGrade": 100
          }, {
            "driverId": 329,
            "receiptNum": 6,
            "driverName": "田福东",
            "driverGrade": 100
          }, {
            "driverId": 2657,
            "receiptNum": 5,
            "driverName": "郑明泉",
            "driverGrade": 100
          }, {
            "driverId": 2013,
            "receiptNum": 5,
            "driverName": "赵启满",
            "driverGrade": 100
          }, {
            "driverId": 198,
            "receiptNum": 5,
            "driverName": "时延青",
            "driverGrade": 100
          }, {
            "driverId": 1053,
            "receiptNum": 4,
            "driverName": "王春雨",
            "driverGrade": 100
          }, {
            "driverId": 2793,
            "receiptNum": 4,
            "driverName": "李超",
            "driverGrade": 100
          }, {
            "driverId": 1899,
            "receiptNum": 4,
            "driverName": "谭继才",
            "driverGrade": 100
          }, {
            "driverId": 1055,
            "receiptNum": 4,
            "driverName": "孟宪宝",
            "driverGrade": 100
          }, {
            "driverId": 4280,
            "receiptNum": 3,
            "driverName": "刘志全",
            "driverGrade": 100
          }, {
            "driverId": 1178,
            "receiptNum": 3,
            "driverName": "张桂福",
            "driverGrade": 100
          }, {
            "driverId": 3686,
            "receiptNum": 3,
            "driverName": "刘建华",
            "driverGrade": 100
          }],
          "councilsGradeLast": [{
            "councilsGrade": 66.9,
            "councilsName": "诸城市宸硕物流有限公司"
          }, {
            "councilsGrade": 70,
            "councilsName": "诸城市宝通物流有限公司"
          }, {
            "councilsGrade": 70,
            "councilsName": "诸城市兴达物流有限公司"
          }, {
            "councilsGrade": 78.7,
            "councilsName": "诸城市永利物流有限公司"
          }, {
            "councilsGrade": 80.3,
            "councilsName": "北京林易达运输有限公司"
          }, {
            "councilsGrade": 83.7,
            "councilsName": "诸城市创宇物流有限公司"
          }, {
            "councilsGrade": 84.9,
            "councilsName": "诸城市宝特物流有限公司"
          }, {
            "councilsGrade": 84.9,
            "councilsName": "北京前成物流有限公司"
          }, {
            "councilsGrade": 85,
            "councilsName": "诸城市润田物流有限公司"
          }, {
            "councilsGrade": 85.3,
            "councilsName": "诸城市新起点供应链管理有限责任公司"
          }, {
            "councilsGrade": 85.3,
            "councilsName": "诸城华良工贸有限公司"
          }, {
            "councilsGrade": 87,
            "councilsName": "北京龙泰物流有限公司"
          }, {
            "councilsGrade": 87.1,
            "councilsName": "诸城市宏佳机械有限公司"
          }, {
            "councilsGrade": 87.5,
            "councilsName": "北京盛世祥运输有限公司"
          }, {
            "councilsGrade": 87.5,
            "councilsName": "诸城市顺晟物流有限公司"
          }, {
            "councilsGrade": 88,
            "councilsName": "诸城市光辉物流有限公司"
          }, {
            "councilsGrade": 88.5,
            "councilsName": "诸城市方凯物流有限公司"
          }, {
            "councilsGrade": 88.9,
            "councilsName": "诸城恒路物流有限公司"
          }, {
            "councilsGrade": 89.4,
            "councilsName": "诸城锦瑞祥物流有限公司"
          }, {
            "councilsGrade": 89.8,
            "councilsName": "诸城市宏盛物流有限公司"
          }],
          "brandGradeTop": [{
            "brandName": "时代",
            "brandGrade": 96
          }, {
            "brandName": "欧马可",
            "brandGrade": 93.4
          }, {
            "brandName": "奥铃",
            "brandGrade": 93.2
          }, {
            "brandName": "欧曼",
            "brandGrade": 91.9
          }, {
            "brandName": "瑞沃",
            "brandGrade": 89.3
          }],
          "orgGradeTop": [{
            "orgName": "南方工程车物流部",
            "orgGrade": 97.1
          }, {
            "orgName": "诸城工程车销售物流部",
            "orgGrade": 94.1
          }, {
            "orgName": "诸城多功能销售物流部",
            "orgGrade": 93.2
          }, {
            "orgName": "怀柔重卡销售物流部",
            "orgGrade": 91.9
          }],
          "orgGradeLast": [{
            "orgName": "怀柔重卡销售物流部",
            "orgGrade": 91.9
          }, {
            "orgName": "诸城多功能销售物流部",
            "orgGrade": 93.2
          }, {
            "orgName": "诸城工程车销售物流部",
            "orgGrade": 94.1
          }, {
            "orgName": "南方工程车物流部",
            "orgGrade": 97.1
          }],
          "driverGradeLast": [{
            "driverId": 654,
            "receiptNum": 2,
            "driverName": "李新燕",
            "driverGrade": 64.6
          }, {
            "driverId": 4397,
            "receiptNum": 2,
            "driverName": "李建军",
            "driverGrade": 65.4
          }, {
            "driverId": 5026,
            "receiptNum": 1,
            "driverName": "张功贤",
            "driverGrade": 65.8
          }, {
            "driverId": 2402,
            "receiptNum": 2,
            "driverName": "雷天一",
            "driverGrade": 66.7
          }, {
            "driverId": 4277,
            "receiptNum": 1,
            "driverName": "姚保华",
            "driverGrade": 66.8
          }, {
            "driverId": 4972,
            "receiptNum": 1,
            "driverName": "王占英",
            "driverGrade": 66.8
          }, {
            "driverId": 1779,
            "receiptNum": 2,
            "driverName": "刘纪云",
            "driverGrade": 66.8
          }, {
            "driverId": 803,
            "receiptNum": 2,
            "driverName": "马俊峰",
            "driverGrade": 66.8
          }, {
            "driverId": 130,
            "receiptNum": 1,
            "driverName": "刘水兵",
            "driverGrade": 66.9
          }, {
            "driverId": 2548,
            "receiptNum": 2,
            "driverName": "张长军",
            "driverGrade": 67.1
          }, {
            "driverId": 3295,
            "receiptNum": 2,
            "driverName": "闫保红",
            "driverGrade": 67.2
          }, {
            "driverId": 1597,
            "receiptNum": 2,
            "driverName": "付必宏",
            "driverGrade": 67.2
          }, {
            "driverId": 2549,
            "receiptNum": 2,
            "driverName": "陈正雷",
            "driverGrade": 67.3
          }, {
            "driverId": 887,
            "receiptNum": 2,
            "driverName": "刘忠跃",
            "driverGrade": 67.3
          }, {
            "driverId": 2740,
            "receiptNum": 2,
            "driverName": "郝强",
            "driverGrade": 67.3
          }, {
            "driverId": 885,
            "receiptNum": 2,
            "driverName": "亢雁群",
            "driverGrade": 67.3
          }, {
            "driverId": 1184,
            "receiptNum": 1,
            "driverName": "王克祥",
            "driverGrade": 67.4
          }, {
            "driverId": 983,
            "receiptNum": 1,
            "driverName": "秦长成",
            "driverGrade": 67.4
          }, {
            "driverId": 1596,
            "receiptNum": 2,
            "driverName": "赵永华",
            "driverGrade": 67.4
          }, {
            "driverId": 3191,
            "receiptNum": 2,
            "driverName": "王伟",
            "driverGrade": 67.4
          }],
          "brandGradeLast": [{
            "brandName": "瑞沃",
            "brandGrade": 89.3
          }, {
            "brandName": "欧曼",
            "brandGrade": 91.9
          }, {
            "brandName": "奥铃",
            "brandGrade": 93.2
          }, {
            "brandName": "欧马可",
            "brandGrade": 93.4
          }, {
            "brandName": "时代",
            "brandGrade": 96
          }],
          "councilsGradeTop": [{
            "councilsGrade": 100,
            "councilsName": "诸城市福源运输有限公司"
          }, {
            "councilsGrade": 100,
            "councilsName": "诸城市顺安物流有限公司"
          }, {
            "councilsGrade": 100,
            "councilsName": "诸城市安畅物流有限公司"
          }, {
            "councilsGrade": 100,
            "councilsName": "湖南瑞荣运输有限公司"
          }, {
            "councilsGrade": 100,
            "councilsName": "诸城市顺天物流有限公司"
          }, {
            "councilsGrade": 100,
            "councilsName": "安丘市锦程物流有限公司"
          }, {
            "councilsGrade": 100,
            "councilsName": "诸城浩伦物流有限公司"
          }, {
            "councilsGrade": 100,
            "councilsName": "诸城市鼎力物流有限公司"
          }, {
            "councilsGrade": 100,
            "councilsName": "诸城市三杨物流有限公司"
          }, {
            "councilsGrade": 100,
            "councilsName": "诸城市华通物流有限公司"
          }, {
            "councilsGrade": 100,
            "councilsName": "诸城恒通物流有限公司"
          }, {
            "councilsGrade": 100,
            "councilsName": "诸城市国华物流有限公司"
          }, {
            "councilsGrade": 99.7,
            "councilsName": "诸城市泓通物流有限公司"
          }, {
            "councilsGrade": 99.7,
            "councilsName": "诸城市安顺达物流有限公司"
          }, {
            "councilsGrade": 99.5,
            "councilsName": "诸城万特物流有限公司"
          }, {
            "councilsGrade": 99.4,
            "councilsName": "诸城市顺航物流有限公司"
          }, {
            "councilsGrade": 99.4,
            "councilsName": "诸城市佳欣物流有限公司"
          }, {
            "councilsGrade": 99.3,
            "councilsName": "诸城市远航物流运输有限公司"
          }, {
            "councilsGrade": 99.3,
            "councilsName": "北京京通华远物流有限公司"
          }, {
            "councilsGrade": 99.3,
            "councilsName": "诸城惠中物流有限公司"
          }]
        },
        "reportDate": {
          "endDate": "2018-10-07",
          "startDate": "2018-10-01"
        },
        "transportResources": {
          "driverNum": [8924, 8],
          "logDepartmentNum": [29, 0],
          "placepointNum": [8971, 6],
          "transportRouteNum": [9103, 4],
          "councilsNum": [122, 0],
          "companyBranchNum": [8, 0]
        },
        "abnormalTransportation": {
          "delayEndCount": [
            ["2018-10-01", 189, 7],
            ["2018-10-02", 323, 6],
            ["2018-10-03", 215, 8],
            ["2018-10-04", 318, 15],
            ["2018-10-05", 197, 39],
            ["2018-10-06", 118, 31],
            ["2018-10-07", 58, 39]
          ],
          "doubtDistCouncilsRank": [{
            "councilsName": "诸城市广宇物流有限公司",
            "totalNum": 103,
            "doubtDistRate": 2.0,
            "doubtDistCount": 2
          }, {
            "councilsName": "开封市畅达物流运输有限公司",
            "totalNum": 147,
            "doubtDistRate": 1.0,
            "doubtDistCount": 1
          }, {
            "councilsName": "北京金福润田物流有限公司",
            "totalNum": 107,
            "doubtDistRate": 0.0,
            "doubtDistCount": 0
          }, {
            "councilsName": "山东福顺捷物流有限公司",
            "totalNum": 9,
            "doubtDistRate": 0.0,
            "doubtDistCount": 0
          }, {
            "councilsName": "北京金昊佳业运输有限公司",
            "totalNum": 88,
            "doubtDistRate": 0.0,
            "doubtDistCount": 0
          }, {
            "councilsName": "诸城市金亮物流有限公司",
            "totalNum": 13,
            "doubtDistRate": 0.0,
            "doubtDistCount": 0
          }, {
            "councilsName": "北京龙泰物流有限公司",
            "totalNum": 27,
            "doubtDistRate": 0.0,
            "doubtDistCount": 0
          }, {
            "councilsName": "诸城华良工贸有限公司",
            "totalNum": 1,
            "doubtDistRate": 0.0,
            "doubtDistCount": 0
          }, {
            "councilsName": "诸城恒通物流有限公司",
            "totalNum": 7,
            "doubtDistRate": 0.0,
            "doubtDistCount": 0
          }, {
            "councilsName": "诸城锦瑞祥物流有限公司",
            "totalNum": 53,
            "doubtDistRate": 0.0,
            "doubtDistCount": 0
          }, {
            "councilsName": "诸城市顺安物流有限公司",
            "totalNum": 2,
            "doubtDistRate": 0.0,
            "doubtDistCount": 0
          }, {
            "councilsName": "诸城市远航物流运输有限公司",
            "totalNum": 16,
            "doubtDistRate": 0.0,
            "doubtDistCount": 0
          }, {
            "councilsName": "诸城市润华物流有限公司",
            "totalNum": 9,
            "doubtDistRate": 0.0,
            "doubtDistCount": 0
          }, {
            "councilsName": "诸城市宸硕物流有限公司",
            "totalNum": 1,
            "doubtDistRate": 0.0,
            "doubtDistCount": 0
          }, {
            "councilsName": "诸城市国华物流有限公司",
            "totalNum": 2,
            "doubtDistRate": 0.0,
            "doubtDistCount": 0
          }, {
            "councilsName": "潍坊一带一路供应链管理有限公司",
            "totalNum": 4,
            "doubtDistRate": 0.0,
            "doubtDistCount": 0
          }, {
            "councilsName": "诸城市泓通物流有限公司",
            "totalNum": 8,
            "doubtDistRate": 0.0,
            "doubtDistCount": 0
          }, {
            "councilsName": "北京京通华远物流有限公司",
            "totalNum": 5,
            "doubtDistRate": 0.0,
            "doubtDistCount": 0
          }, {
            "councilsName": "诸城惠中物流有限公司",
            "totalNum": 6,
            "doubtDistRate": 0.0,
            "doubtDistCount": 0
          }, {
            "councilsName": "诸城恒路物流有限公司",
            "totalNum": 9,
            "doubtDistRate": 0.0,
            "doubtDistCount": 0
          }],
          "delayEndCouncilsRank": [{
            "councilsName": "诸城华良工贸有限公司",
            "delayEndCount": 1,
            "totalNum": 1,
            "delayEndRate": 100.0
          }, {
            "councilsName": "北京林易达运输有限公司",
            "delayEndCount": 44,
            "totalNum": 45,
            "delayEndRate": 98.0
          }, {
            "councilsName": "诸城市润华物流有限公司",
            "delayEndCount": 8,
            "totalNum": 9,
            "delayEndRate": 89.0
          }, {
            "councilsName": "开封市畅达物流运输有限公司",
            "delayEndCount": 130,
            "totalNum": 147,
            "delayEndRate": 88.0
          }, {
            "councilsName": "诸城锦瑞祥物流有限公司",
            "delayEndCount": 37,
            "totalNum": 53,
            "delayEndRate": 70.0
          }, {
            "councilsName": "北京盛世祥运输有限公司",
            "delayEndCount": 53,
            "totalNum": 78,
            "delayEndRate": 68.0
          }, {
            "councilsName": "北京龙泰物流有限公司",
            "delayEndCount": 21,
            "totalNum": 31,
            "delayEndRate": 68.0
          }, {
            "councilsName": "诸城市创宇物流有限公司",
            "delayEndCount": 2,
            "totalNum": 3,
            "delayEndRate": 67.0
          }, {
            "councilsName": "北京正运物流有限公司",
            "delayEndCount": 60,
            "totalNum": 92,
            "delayEndRate": 65.0
          }, {
            "councilsName": "北京前成物流有限公司",
            "delayEndCount": 31,
            "totalNum": 50,
            "delayEndRate": 62.0
          }, {
            "councilsName": "北京金昊佳业运输有限公司",
            "delayEndCount": 52,
            "totalNum": 89,
            "delayEndRate": 58.0
          }, {
            "councilsName": "吉林省华航实业集团有限公司",
            "delayEndCount": 24,
            "totalNum": 42,
            "delayEndRate": 57.0
          }, {
            "councilsName": "诸城市宏盛物流有限公司",
            "delayEndCount": 29,
            "totalNum": 70,
            "delayEndRate": 41.0
          }, {
            "councilsName": "长沙润恒物流有限公司",
            "delayEndCount": 1,
            "totalNum": 3,
            "delayEndRate": 33.0
          }, {
            "councilsName": "潍坊一带一路供应链管理有限公司",
            "delayEndCount": 1,
            "totalNum": 4,
            "delayEndRate": 25.0
          }, {
            "councilsName": "诸城市新起点供应链管理有限责任公司",
            "delayEndCount": 6,
            "totalNum": 28,
            "delayEndRate": 21.0
          }, {
            "councilsName": "北京京通华远物流有限公司",
            "delayEndCount": 1,
            "totalNum": 5,
            "delayEndRate": 20.0
          }, {
            "councilsName": "诸城市方凯物流有限公司",
            "delayEndCount": 3,
            "totalNum": 17,
            "delayEndRate": 18.0
          }, {
            "councilsName": "诸城恒路物流有限公司",
            "delayEndCount": 2,
            "totalNum": 11,
            "delayEndRate": 18.0
          }, {
            "councilsName": "诸城恒通物流有限公司",
            "delayEndCount": 1,
            "totalNum": 7,
            "delayEndRate": 14.0
          }],
          "delayBeginCouncilsRank": [{
            "councilsName": "吉林省华航实业集团有限公司",
            "totalNum": 42,
            "delayBeginRate": 95.0,
            "delayBeginCount": 40
          }, {
            "councilsName": "开封市畅达物流运输有限公司",
            "totalNum": 147,
            "delayBeginRate": 88.0,
            "delayBeginCount": 130
          }, {
            "councilsName": "诸城锦瑞祥物流有限公司",
            "totalNum": 53,
            "delayBeginRate": 83.0,
            "delayBeginCount": 44
          }, {
            "councilsName": "潍坊一带一路供应链管理有限公司",
            "totalNum": 4,
            "delayBeginRate": 75.0,
            "delayBeginCount": 3
          }, {
            "councilsName": "北京金昊佳业运输有限公司",
            "totalNum": 89,
            "delayBeginRate": 74.0,
            "delayBeginCount": 66
          }, {
            "councilsName": "诸城市创宇物流有限公司",
            "totalNum": 3,
            "delayBeginRate": 67.0,
            "delayBeginCount": 2
          }, {
            "councilsName": "诸城市宏佳机械有限公司",
            "totalNum": 95,
            "delayBeginRate": 47.0,
            "delayBeginCount": 45
          }, {
            "councilsName": "诸城市润华物流有限公司",
            "totalNum": 9,
            "delayBeginRate": 44.0,
            "delayBeginCount": 4
          }, {
            "councilsName": "诸城恒通物流有限公司",
            "totalNum": 7,
            "delayBeginRate": 43.0,
            "delayBeginCount": 3
          }, {
            "councilsName": "北京前成物流有限公司",
            "totalNum": 50,
            "delayBeginRate": 42.0,
            "delayBeginCount": 21
          }, {
            "councilsName": "诸城市宏盛物流有限公司",
            "totalNum": 70,
            "delayBeginRate": 41.0,
            "delayBeginCount": 29
          }, {
            "councilsName": "诸城市顺晟物流有限公司",
            "totalNum": 21,
            "delayBeginRate": 38.0,
            "delayBeginCount": 8
          }, {
            "councilsName": "北京正运物流有限公司",
            "totalNum": 92,
            "delayBeginRate": 36.0,
            "delayBeginCount": 33
          }, {
            "councilsName": "北京林易达运输有限公司",
            "totalNum": 45,
            "delayBeginRate": 36.0,
            "delayBeginCount": 16
          }, {
            "councilsName": "北京龙泰物流有限公司",
            "totalNum": 31,
            "delayBeginRate": 35.0,
            "delayBeginCount": 11
          }, {
            "councilsName": "诸城市福安运输有限公司",
            "totalNum": 23,
            "delayBeginRate": 35.0,
            "delayBeginCount": 8
          }, {
            "councilsName": "诸城市宝特物流有限公司",
            "totalNum": 17,
            "delayBeginRate": 35.0,
            "delayBeginCount": 6
          }, {
            "councilsName": "诸城市兴达物流有限公司",
            "totalNum": 3,
            "delayBeginRate": 33.0,
            "delayBeginCount": 1
          }, {
            "councilsName": "长沙润恒物流有限公司",
            "totalNum": 3,
            "delayBeginRate": 33.0,
            "delayBeginCount": 1
          }, {
            "councilsName": "诸城行运物流有限公司",
            "totalNum": 7,
            "delayBeginRate": 29.0,
            "delayBeginCount": 2
          }],
          "abMileageCouncilsRank": [{
            "councilsName": "长沙润恒物流有限公司",
            "abMileageRate": 100.0,
            "totalNum": 3,
            "abMileageCount": 3
          }, {
            "councilsName": "诸城华良工贸有限公司",
            "abMileageRate": 100.0,
            "totalNum": 1,
            "abMileageCount": 1
          }, {
            "councilsName": "诸城市明辉物流有限公司",
            "abMileageRate": 100.0,
            "totalNum": 1,
            "abMileageCount": 1
          }, {
            "councilsName": "诸城市福安运输有限公司",
            "abMileageRate": 90.0,
            "totalNum": 20,
            "abMileageCount": 18
          }, {
            "councilsName": "诸城市宝特物流有限公司",
            "abMileageRate": 90.0,
            "totalNum": 10,
            "abMileageCount": 9
          }, {
            "councilsName": "诸城中一物流有限公司",
            "abMileageRate": 85.0,
            "totalNum": 13,
            "abMileageCount": 11
          }, {
            "councilsName": "诸城市顺晟物流有限公司",
            "abMileageRate": 73.0,
            "totalNum": 15,
            "abMileageCount": 11
          }, {
            "councilsName": "安吉汽车物流（山东）有限公司",
            "abMileageRate": 68.0,
            "totalNum": 19,
            "abMileageCount": 13
          }, {
            "councilsName": "吉林省华航实业集团有限公司",
            "abMileageRate": 64.0,
            "totalNum": 42,
            "abMileageCount": 27
          }, {
            "councilsName": "北京前成物流有限公司",
            "abMileageRate": 64.0,
            "totalNum": 39,
            "abMileageCount": 25
          }, {
            "councilsName": "诸城市远航物流运输有限公司",
            "abMileageRate": 56.0,
            "totalNum": 16,
            "abMileageCount": 9
          }, {
            "councilsName": "中国外运山东有限公司汽车运输分公司",
            "abMileageRate": 56.0,
            "totalNum": 9,
            "abMileageCount": 5
          }, {
            "councilsName": "北京鼎邦物流有限公司",
            "abMileageRate": 50.0,
            "totalNum": 14,
            "abMileageCount": 7
          }, {
            "councilsName": "诸城市捷安物流有限公司",
            "abMileageRate": 50.0,
            "totalNum": 8,
            "abMileageCount": 4
          }, {
            "councilsName": "诸城惠中物流有限公司",
            "abMileageRate": 50.0,
            "totalNum": 6,
            "abMileageCount": 3
          }, {
            "councilsName": "潍坊一带一路供应链管理有限公司",
            "abMileageRate": 50.0,
            "totalNum": 4,
            "abMileageCount": 2
          }, {
            "councilsName": "诸城市佳欣物流有限公司",
            "abMileageRate": 50.0,
            "totalNum": 4,
            "abMileageCount": 2
          }, {
            "councilsName": "诸城市亿圆物流有限公司",
            "abMileageRate": 50.0,
            "totalNum": 2,
            "abMileageCount": 1
          }, {
            "councilsName": "湖南鑫驰汽车运输有限公司",
            "abMileageRate": 50.0,
            "totalNum": 2,
            "abMileageCount": 1
          }, {
            "councilsName": "诸城市远大物流有限公司",
            "abMileageRate": 48.0,
            "totalNum": 90,
            "abMileageCount": 43
          }],
          "delayBeginCount": [
            ["2018-10-01", 162, 34],
            ["2018-10-02", 270, 59],
            ["2018-10-03", 138, 85],
            ["2018-10-04", 233, 100],
            ["2018-10-05", 128, 108],
            ["2018-10-06", 80, 69],
            ["2018-10-07", 30, 67]
          ],
          "abMileageCount": [
            ["2018-10-01", 107, 66],
            ["2018-10-02", 244, 76],
            ["2018-10-03", 126, 74],
            ["2018-10-04", 187, 101],
            ["2018-10-05", 113, 71],
            ["2018-10-06", 68, 46],
            ["2018-10-07", 57, 25]
          ],
          "doubtDistCount": [
            ["2018-10-07", 95, 0],
            ["2018-10-06", 148, 0],
            ["2018-10-05", 234, 1],
            ["2018-10-04", 328, 0],
            ["2018-10-03", 220, 1],
            ["2018-10-02", 325, 0],
            ["2018-10-01", 186, 1]
          ]
        },
        "type": "carBrand",
        "transportSituation": {
          "weekBeforeTransportSituation": {
            "allOrder": 4022,
            "ontimeEndRate": "47.0%",
            "ontimeBeginRate": "52.3%"
          },
          "lastWeekTransportSituation": {
            "allOrder": 163.0,
            "abnormalNum": 31,
            "onroadNum": 7,
            "ontimeEndRate": "35.6%",
            "ontimeBeginRate": "35.6%",
            "arriveNum": 111,
            "waitScheNum": 14
          }
        }
      } as ILogisticReportData;
      comp.dataService.renderReportData();
      comp.reportData = comp.dataService.reportData as ILogisticReportData;
      comp.bindData();
      fixture.detectChanges();
    });

    it('物流资源情况数据显示成功', () => {
      let values = Array.from(page.resourceNodes).map((val) => {
        return val.getAttribute('data-value');
      });
      let mockData = comp.accountIfAddData.map(elem => comp.reportData.transportResources[elem.valueKey]);
      expect(values.join().replace(/\,/g, '')).toEqual(mockData.join().replace(/\,/g, ''));
    });

    it('车联网物流资源情况（概述）显示成功', () => {
      let len = page.newAddNames.length;
      let mockData = comp.accountIfAddData.filter(elem => comp.reportData.transportResources[elem.valueKey][1] > 0);
      expect(len).toEqual(mockData.length);
    });

    it('车辆运输概况（概述）显示成功', () => {
      let orders = page.orders;
      let mockData = comp.reportData.transportSituation;
      expect(orders[0].nativeElement.textContent.replace(/[^\d]/g, '')).toEqual(mockData.lastWeekTransportSituation.allOrder +'');
      let addTotalOrder = Math.abs(mockData.lastWeekTransportSituation.allOrder-mockData.weekBeforeTransportSituation.allOrder) + '';
      expect(orders[1].nativeElement.textContent.replace(/[^\d]/g, '')).toEqual(addTotalOrder);
    });

    it('车辆异常运输top5显示成功', () => {
      let abnormalLis = page.abnormalLis;
      expect(abnormalLis.length).toEqual(15);
    })

    it('车辆运输质量评价显示成功', () => {
      let len = page.evaluteList.length;
      expect(len).toEqual(5);
    })

    it('按司机得分评价运输质量数据显示成功', () => {
      let len = page.driverGood3.length;
      expect(len).toEqual(3);
      let other = page.driverOthers.length;
      expect(other).toEqual(17);

    })
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
  get productTime() { return this.query<HTMLLIElement>('.time'); }

  get logisticResource() { return fixture.debugElement.queryAll(By.css('.only-one')); }
  get newAddNames() { return fixture.debugElement.queryAll(By.css('.trans-resource .test1')); }
  get resourceNodes() { return this.queryAll<HTMLLIElement>('.total-info div'); }

  get orders() { return fixture.debugElement.queryAll(By.css('.cars-transport .num-order'));}
  get poorBrands() { return fixture.debugElement.queryAll(By.css('.cars-transport .num-order'));}

  get abnormalLis() { return fixture.debugElement.queryAll(By.css('.abnormal-trans .sort-content'));}
  get evaluteList() { return fixture.debugElement.queryAll(By.css('.evalute .progress-content'));}

  get driverGood3() { return fixture.debugElement.queryAll(By.css('.driver-rate .sort>div'));}
  get driverOthers() { return fixture.debugElement.queryAll(By.css('.driver-rate .item'));}

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

