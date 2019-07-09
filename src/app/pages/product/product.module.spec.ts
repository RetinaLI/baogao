import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ProductComponent} from './product.component';
import {SharedModule} from '../../providors/share.module';
import {HttpClientModule} from '@angular/HttpClient';
import {By} from '@angular/platform-browser';
import {IProductData} from '../../services/data.interface';
// import {DataService} from '../../services/data.service';

describe('用户使用大数据报告', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  // let dataService: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [SharedModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('组件创建', () => {
    expect(component).toBeTruthy();
  });

  it('初始化属性检测', () => {
    expect(component.bannerInfo).toEqual({
      endDate: '',
      startDate: '',
      title: `用户使用大数据报告`,
      platform: '福田车联网平台',
      currentTime: ''
    });
    expect(component.accountIfAdd).toEqual([{
      sourceVal: [0, 0],
      numberVal: [0, 0],
      name: '',
      addValue: ''
    }, {
      sourceVal: [0, 0],
      numberVal: [0, 0],
      name: '',
      addValue: ''
    }]);
    expect(component.visitList).toEqual([]);
    expect(component.sortTopList).toEqual([]);
    expect(component.sortList).toEqual([]);
    expect(component.listSort).toEqual([]);
    expect(component.parkList).toEqual([]);
    expect(component.dealerList).toEqual([]);
    expect(component.dealerScale).toEqual([{
      value: 0,
      name: ''
    }]);
    expect(component.parkScale).toEqual([{
      value: 0,
      name: ''
    }]);
    expect(component.lifts).toEqual(['2', '1', '0']);
    expect(component.detail).toEqual({
      text: '持平',
      result: 0
    });
    expect(component.detailCom).toEqual({
      text: '持平',
      result: 0
    });
  });

  describe('没有数据时的页面展示', () => {
    it('报告生成时间为空', () => {
      const $reportCreateTime = fixture.debugElement.query(By.css('.time'));
      expect($reportCreateTime.nativeElement.textContent.trim()).toEqual('报告生成时间:');
    });
    it('车联网平台概况', () => {
      const $values = fixture.debugElement.queryAll(By.css('.not-only-one'));
      let values = $values.map($elem => {
        return $elem.nativeElement.textContent;
      });
      expect(values.join('')).toEqual('0'.repeat(values.length));
    });
    it('开通企业排行TOP10, 按产品统计用户访问排行TOP10, 车厂端常用功能用户访问统计TOP10, 经销商端常用功能用户访问统计TOP10', () => {
      const $values = fixture.debugElement.queryAll(By.css('.progress-content'));
      // let values = $values.map($elem => {
      //   return $elem.nativeElement.textContent;
      // });
      expect($values.length).toEqual(0);
    });
  });

  describe('有数据时的页面展示', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ProductComponent);
      component = fixture.componentInstance;
      component.dataService.reportData = {
        "currentTime": 1541982836785,
        "reportDate": {
          "endDate": "2018/11/11",
          "startDate": "2018/11/05"
        },
        "subscTemplateName": "用户使用大数据报告",
        "visitStatisticsWeek": {
          "beforeLastWeekVisit": {
            "2018-10-29": 0,
            "2018-10-30": 162,
            "2018-10-31": 121,
            "2018-11-01": 123,
            "2018-11-02": 132,
            "2018-11-03": 126,
            "2018-11-04": 69
          },
          "maxDay": "2018-11-05",
          "lastWeekVisit": {
            "2018-11-05": 181,
            "2018-11-06": 175,
            "2018-11-07": 124,
            "2018-11-08": 130,
            "2018-11-09": 138,
            "2018-11-10": 87,
            "2018-11-11": 107
          },
          "lastTotal": 942,
          "maxCount": 181,
          "beforeLastTotal": 733,
          "desc": "访问统计"
        },
        "visitStatisticsDealer": {
          "lastCompanyVisitTotal": 17,
          "lastCompanyTotal": 3561,
          "companyVisitList": [
            {
              "compared": "1",
              "count": 23,
              "name": "河南华通实业有限公司"
            },
            {
              "compared": "1",
              "count": 11,
              "name": "石家庄晨阳迅驰汽车贸易有限公司"
            },
            {
              "compared": "1",
              "count": 9,
              "name": "葫芦岛市金欧达汽车销售服务有限公司"
            },
            {
              "compared": "1",
              "count": 6,
              "name": "南阳华鸿汽车销售服务有限公司"
            },
            {
              "compared": "1",
              "count": 6,
              "name": "沈阳龙之星汽车销售服务有限公司"
            },
            {
              "compared": "1",
              "count": 4,
              "name": "盂县晋田汽车销售服务有限公司"
            },
            {
              "compared": "1",
              "count": 3,
              "name": "徐州凯驰汽车贸易有限公司"
            },
            {
              "compared": "1",
              "count": 2,
              "name": "梁山华顺汽车销售服务有限公司"
            },
            {
              "compared": "1",
              "count": 2,
              "name": "陕西燎原行晟科技发展有限责任公司"
            },
            {
              "compared": "1",
              "count": 1,
              "name": "乌鲁木齐鑫晟东方汽车销售有限公司"
            },
            {
              "compared": "1",
              "count": 1,
              "name": "山东鑫海商贸有限公司"
            },
            {
              "compared": "1",
              "count": 1,
              "name": "成都东方汽车贸易有限责任公司"
            },
            {
              "compared": "1",
              "count": 1,
              "name": "成都劲驰汽车销售服务有限公司"
            },
            {
              "compared": "1",
              "count": 1,
              "name": "江西省钜新汽车发展有限公司"
            },
            {
              "compared": "0",
              "count": 1,
              "name": "石家庄金冠锐驰汽车销售有限公司"
            },
            {
              "compared": "1",
              "count": 1,
              "name": "陕西伊斯特汽车贸易有限公司"
            },
            {
              "compared": "1",
              "count": 1,
              "name": "龙岩市新东风汽车贸易有限公司"
            }
          ],
          "desc": "查询经销商端各企业访问情况"
        },
        "functionsUsedByFactory": {
          "functionsUsedList": [
            {
              "compared": "1",
              "count": 7679,
              "name": "长途运输"
            },
            {
              "compared": "1",
              "count": 2781,
              "name": "首页"
            },
            {
              "compared": "1",
              "count": 2495,
              "name": "运营数据"
            },
            {
              "compared": "1",
              "count": 1989,
              "name": "按车型及月份"
            },
            {
              "compared": "1",
              "count": 1775,
              "name": "车辆位置"
            },
            {
              "compared": "1",
              "count": 673,
              "name": "动态分布"
            },
            {
              "compared": "1",
              "count": 624,
              "name": "实时数据"
            },
            {
              "compared": "1",
              "count": 493,
              "name": "综合评价"
            },
            {
              "compared": "1",
              "count": 448,
              "name": "里程合规性"
            },
            {
              "compared": "1",
              "count": 442,
              "name": "GPS设备定位统计"
            },
            {
              "compared": "1",
              "count": 400,
              "name": "明细表"
            },
            {
              "compared": "1",
              "count": 388,
              "name": "车辆注册"
            },
            {
              "compared": "-1",
              "count": 343,
              "name": "统计汇总"
            },
            {
              "compared": "-1",
              "count": 254,
              "name": "车辆分布"
            },
            {
              "compared": "1",
              "count": 233,
              "name": "单车分析"
            },
            {
              "compared": "-1",
              "count": 197,
              "name": "按地区统计"
            },
            {
              "compared": "-1",
              "count": 184,
              "name": "按业务"
            },
            {
              "compared": "-1",
              "count": 178,
              "name": "按月份"
            },
            {
              "compared": "-1",
              "count": 169,
              "name": "轨迹比对"
            },
            {
              "compared": "1",
              "count": 167,
              "name": "服务真实性"
            },
            {
              "compared": "-1",
              "count": 162,
              "name": "锁车解锁"
            },
            {
              "compared": "-1",
              "count": 155,
              "name": "司机信息管理"
            },
            {
              "compared": "1",
              "count": 152,
              "name": "行驶分析"
            },
            {
              "compared": "1",
              "count": 149,
              "name": "账号管理"
            },
            {
              "compared": "1",
              "count": 144,
              "name": "运营分析"
            },
            {
              "compared": "-1",
              "count": 135,
              "name": "锁车/解锁"
            },
            {
              "compared": "0",
              "count": 128,
              "name": "故障处理"
            },
            {
              "compared": "1",
              "count": 120,
              "name": "重复进站监控"
            },
            {
              "compared": "-1",
              "count": 118,
              "name": "领导看板"
            },
            {
              "compared": "-1",
              "count": 108,
              "name": "承运商司机分配"
            },
            {
              "compared": "-1",
              "count": 96,
              "name": "终端登记"
            },
            {
              "compared": "1",
              "count": 89,
              "name": "车辆台账"
            },
            {
              "compared": "-1",
              "count": 87,
              "name": "按企业统计"
            },
            {
              "compared": "1",
              "count": 80,
              "name": "运单看板"
            },
            {
              "compared": "-1",
              "count": 79,
              "name": "在线统计"
            },
            {
              "compared": "1",
              "count": 78,
              "name": "蓄电池监控"
            },
            {
              "compared": "1",
              "count": 77,
              "name": "运单状态汇总"
            },
            {
              "compared": "1",
              "count": 76,
              "name": "实销预警"
            },
            {
              "compared": "1",
              "count": 76,
              "name": "故障查询"
            },
            {
              "compared": "1",
              "count": 75,
              "name": "及时率-按主品牌"
            },
            {
              "compared": "1",
              "count": 73,
              "name": "停车运单汇总"
            },
            {
              "compared": "1",
              "count": 73,
              "name": "运单查询"
            },
            {
              "compared": "1",
              "count": 71,
              "name": "及时率-按分公司"
            },
            {
              "compared": "-1",
              "count": 68,
              "name": "报单及时性"
            },
            {
              "compared": "-1",
              "count": 68,
              "name": "锁车记录"
            },
            {
              "compared": "-1",
              "count": 64,
              "name": "油耗异常"
            },
            {
              "compared": "-1",
              "count": 63,
              "name": "测试完成"
            },
            {
              "compared": "1",
              "count": 62,
              "name": "故障码分析"
            },
            {
              "compared": "-1",
              "count": 58,
              "name": "承运商设备分配"
            },
            {
              "compared": "1",
              "count": 58,
              "name": "离线预警"
            },
            {
              "compared": "-1",
              "count": 53,
              "name": "实时监控"
            },
            {
              "compared": "1",
              "count": 53,
              "name": "时间条件"
            },
            {
              "compared": "1",
              "count": 53,
              "name": "真实性看板"
            },
            {
              "compared": "1",
              "count": 51,
              "name": "蓄电池报警"
            },
            {
              "compared": "1",
              "count": 50,
              "name": "故障率分析"
            },
            {
              "compared": "1",
              "count": 48,
              "name": "报警查询"
            },
            {
              "compared": "1",
              "count": 44,
              "name": "销售查询"
            },
            {
              "compared": "1",
              "count": 43,
              "name": "合同车辆"
            },
            {
              "compared": "-1",
              "count": 40,
              "name": "在途监控"
            },
            {
              "compared": "1",
              "count": 32,
              "name": "运营查询"
            },
            {
              "compared": "-1",
              "count": 29,
              "name": "汇总"
            },
            {
              "compared": "1",
              "count": 29,
              "name": "销售看板"
            },
            {
              "compared": "1",
              "count": 28,
              "name": "销售分析"
            },
            {
              "compared": "1",
              "count": 27,
              "name": "历史故障"
            },
            {
              "compared": "-1",
              "count": 27,
              "name": "车辆分析"
            },
            {
              "compared": "1",
              "count": 26,
              "name": "故障清除"
            },
            {
              "compared": "1",
              "count": 25,
              "name": "地区分布"
            },
            {
              "compared": "1",
              "count": 24,
              "name": "分公司考核"
            },
            {
              "compared": "1",
              "count": 23,
              "name": "异常运单"
            },
            {
              "compared": "1",
              "count": 23,
              "name": "服务商分布"
            },
            {
              "compared": "1",
              "count": 23,
              "name": "用车行为"
            },
            {
              "compared": "1",
              "count": 23,
              "name": "角色设置"
            },
            {
              "compared": "1",
              "count": 23,
              "name": "零部件使用"
            },
            {
              "compared": "-1",
              "count": 22,
              "name": "工况分析"
            },
            {
              "compared": "1",
              "count": 22,
              "name": "库存分布"
            },
            {
              "compared": "1",
              "count": 22,
              "name": "离线车辆"
            },
            {
              "compared": "-1",
              "count": 22,
              "name": "车辆数据"
            },
            {
              "compared": "1",
              "count": 21,
              "name": "在途预警"
            },
            {
              "compared": "-1",
              "count": 20,
              "name": "运单统计"
            },
            {
              "compared": "1",
              "count": 20,
              "name": "运输时效性"
            },
            {
              "compared": "1",
              "count": 19,
              "name": "运营率"
            },
            {
              "compared": "-1",
              "count": 18,
              "name": "发送指令"
            },
            {
              "compared": "-1",
              "count": 18,
              "name": "报警处理"
            },
            {
              "compared": "1",
              "count": 17,
              "name": "中心库预警"
            },
            {
              "compared": "1",
              "count": 17,
              "name": "岗位设置"
            },
            {
              "compared": "1",
              "count": 17,
              "name": "时段分析"
            },
            {
              "compared": "1",
              "count": 17,
              "name": "送达评价"
            },
            {
              "compared": "1",
              "count": 16,
              "name": "围栏设置"
            },
            {
              "compared": "1",
              "count": 16,
              "name": "工况预警"
            },
            {
              "compared": "1",
              "count": 16,
              "name": "平均里程"
            },
            {
              "compared": "1",
              "count": 16,
              "name": "设备更换"
            },
            {
              "compared": "-1",
              "count": 15,
              "name": "车辆档案"
            },
            {
              "compared": "1",
              "count": 14,
              "name": "工况报告"
            },
            {
              "compared": "1",
              "count": 13,
              "name": "库存分析"
            },
            {
              "compared": "1",
              "count": 13,
              "name": "库存盘点"
            },
            {
              "compared": "1",
              "count": 12,
              "name": "平均速度"
            },
            {
              "compared": "1",
              "count": 12,
              "name": "送达异常"
            },
            {
              "compared": "1",
              "count": 11,
              "name": "承运商考核"
            },
            {
              "compared": "1",
              "count": 11,
              "name": "电池监控"
            },
            {
              "compared": "1",
              "count": 11,
              "name": "离线分析"
            },
            {
              "compared": "1",
              "count": 11,
              "name": "经销商分布"
            },
            {
              "compared": "1",
              "count": 11,
              "name": "驾驶行为"
            },
            {
              "compared": "-1",
              "count": 10,
              "name": "指令列表"
            },
            {
              "compared": "1",
              "count": 10,
              "name": "故障分析"
            },
            {
              "compared": "1",
              "count": 10,
              "name": "车辆管理"
            },
            {
              "compared": "1",
              "count": 9,
              "name": "客户信息"
            },
            {
              "compared": "1",
              "count": 9,
              "name": "车型注册"
            },
            {
              "compared": "1",
              "count": 8,
              "name": "未锁定预警"
            },
            {
              "compared": "1",
              "count": 8,
              "name": "车型分配"
            },
            {
              "compared": "1",
              "count": 8,
              "name": "运营报告"
            },
            {
              "compared": "1",
              "count": 8,
              "name": "里程分析"
            },
            {
              "compared": "1",
              "count": 8,
              "name": "锁车分析"
            },
            {
              "compared": "1",
              "count": 7,
              "name": "出发/目的地"
            },
            {
              "compared": "-1",
              "count": 7,
              "name": "数据异常"
            },
            {
              "compared": "1",
              "count": 7,
              "name": "时长排行"
            },
            {
              "compared": "1",
              "count": 7,
              "name": "运输异常"
            },
            {
              "compared": "1",
              "count": 6,
              "name": "合同信息"
            },
            {
              "compared": "-1",
              "count": 6,
              "name": "地理位置标注"
            },
            {
              "compared": "-1",
              "count": 6,
              "name": "客户信息管理"
            },
            {
              "compared": "1",
              "count": 6,
              "name": "库存监控"
            },
            {
              "compared": "-1",
              "count": 6,
              "name": "报警分析"
            },
            {
              "compared": "-1",
              "count": 6,
              "name": "按企业及日期"
            },
            {
              "compared": "1",
              "count": 6,
              "name": "月度运营"
            },
            {
              "compared": "-1",
              "count": 6,
              "name": "未及时起运预警"
            },
            {
              "compared": "1",
              "count": 6,
              "name": "电子围栏"
            },
            {
              "compared": "1",
              "count": 6,
              "name": "路线设置"
            },
            {
              "compared": "-1",
              "count": 5,
              "name": "承运商管理"
            },
            {
              "compared": "1",
              "count": 5,
              "name": "报警关联"
            },
            {
              "compared": "-1",
              "count": 5,
              "name": "新增终端"
            },
            {
              "compared": "1",
              "count": 5,
              "name": "经销商信息"
            },
            {
              "compared": "1",
              "count": 5,
              "name": "驾驶安全性"
            },
            {
              "compared": "1",
              "count": 4,
              "name": "GPS设备使用率-按分公司"
            },
            {
              "compared": "-1",
              "count": 4,
              "name": "下线调试"
            },
            {
              "compared": "1",
              "count": 4,
              "name": "仓库管理"
            },
            {
              "compared": "1",
              "count": 4,
              "name": "实时报警"
            },
            {
              "compared": "1",
              "count": 4,
              "name": "客户反馈"
            },
            {
              "compared": "-1",
              "count": 4,
              "name": "承运商分配"
            },
            {
              "compared": "1",
              "count": 4,
              "name": "报警级别"
            },
            {
              "compared": "1",
              "count": 4,
              "name": "报警车辆"
            },
            {
              "compared": "1",
              "count": 4,
              "name": "数据监控"
            },
            {
              "compared": "1",
              "count": 4,
              "name": "未及时到达预警"
            },
            {
              "compared": "-1",
              "count": 4,
              "name": "物流部设备分配"
            },
            {
              "compared": "1",
              "count": 4,
              "name": "经销商报告"
            },
            {
              "compared": "-1",
              "count": 4,
              "name": "车辆分配"
            },
            {
              "compared": "-1",
              "count": 4,
              "name": "车辆监控"
            },
            {
              "compared": "1",
              "count": 4,
              "name": "运营排行"
            },
            {
              "compared": "1",
              "count": 4,
              "name": "里程未过半预警"
            },
            {
              "compared": "1",
              "count": 3,
              "name": "保养提醒"
            },
            {
              "compared": "1",
              "count": 3,
              "name": "大客户报告"
            },
            {
              "compared": "1",
              "count": 3,
              "name": "客户数据"
            },
            {
              "compared": "-1",
              "count": 3,
              "name": "岗位授权"
            },
            {
              "compared": "1",
              "count": 3,
              "name": "库存点管理"
            },
            {
              "compared": "0",
              "count": 3,
              "name": "按车型统计"
            },
            {
              "compared": "1",
              "count": 3,
              "name": "终端巡检"
            },
            {
              "compared": "1",
              "count": 3,
              "name": "经销商管理"
            },
            {
              "compared": "1",
              "count": 3,
              "name": "评分排行"
            },
            {
              "compared": "1",
              "count": 3,
              "name": "运营分段"
            },
            {
              "compared": "1",
              "count": 3,
              "name": "速度排行"
            },
            {
              "compared": "1",
              "count": 3,
              "name": "部门设置"
            },
            {
              "compared": "0",
              "count": 2,
              "name": "到达提醒"
            },
            {
              "compared": "1",
              "count": 2,
              "name": "区域分析"
            },
            {
              "compared": "1",
              "count": 2,
              "name": "历史报警"
            },
            {
              "compared": "-1",
              "count": 2,
              "name": "司机数据"
            },
            {
              "compared": "-1",
              "count": 2,
              "name": "围栏记录"
            },
            {
              "compared": "1",
              "count": 2,
              "name": "在线分析"
            },
            {
              "compared": "1",
              "count": 2,
              "name": "地址管理"
            },
            {
              "compared": "1",
              "count": 2,
              "name": "工况定义"
            },
            {
              "compared": "1",
              "count": 2,
              "name": "按大区"
            },
            {
              "compared": "1",
              "count": 2,
              "name": "按日期"
            },
            {
              "compared": "1",
              "count": 2,
              "name": "新增车辆"
            },
            {
              "compared": "-1",
              "count": 2,
              "name": "经销商授权"
            },
            {
              "compared": "1",
              "count": 2,
              "name": "运单及时性统计"
            },
            {
              "compared": "1",
              "count": 2,
              "name": "远程升级"
            },
            {
              "compared": "0",
              "count": 2,
              "name": "远程锁车"
            },
            {
              "compared": "1",
              "count": 2,
              "name": "逾期台账"
            },
            {
              "compared": "1",
              "count": 2,
              "name": "锁车报告"
            },
            {
              "compared": "-1",
              "count": 1,
              "name": "分销渠道管理"
            },
            {
              "compared": "1",
              "count": 1,
              "name": "发送短信"
            },
            {
              "compared": "1",
              "count": 1,
              "name": "发送邮件"
            },
            {
              "compared": "1",
              "count": 1,
              "name": "司机及设备信息管理"
            },
            {
              "compared": "-1",
              "count": 1,
              "name": "品牌排名"
            },
            {
              "compared": "1",
              "count": 1,
              "name": "大区信息"
            },
            {
              "compared": "0",
              "count": 1,
              "name": "指标管理"
            },
            {
              "compared": "1",
              "count": 1,
              "name": "按客户"
            },
            {
              "compared": "1",
              "count": 1,
              "name": "按经销商"
            },
            {
              "compared": "1",
              "count": 1,
              "name": "按车型汇总"
            },
            {
              "compared": "-1",
              "count": 1,
              "name": "物流部排名"
            },
            {
              "compared": "1",
              "count": 1,
              "name": "车辆远控"
            },
            {
              "compared": "0",
              "count": 0,
              "name": "实销看板"
            }
          ],
          "desc": "查询车厂端常用功能"
        },
        "visitStatisticsFactory": {
          "lastCompanyVisitTotal": 13,
          "lastCompanyTotal": 53,
          "companyVisitList": [
            {
              "compared": "1",
              "count": 76,
              "name": "福田智科物流"
            },
            {
              "compared": "-1",
              "count": 15,
              "name": "福田雷萨"
            },
            {
              "compared": "1",
              "count": 10,
              "name": "福田大数据"
            },
            {
              "compared": "-1",
              "count": 7,
              "name": "欧辉新能源"
            },
            {
              "compared": "1",
              "count": 4,
              "name": "计划与营销管理本部"
            },
            {
              "compared": "-1",
              "count": 2,
              "name": "福田智科物流"
            },
            {
              "compared": "1",
              "count": 1,
              "name": "福田奥铃"
            },
            {
              "compared": "1",
              "count": 1,
              "name": "福田新能源"
            },
            {
              "compared": "1",
              "count": 1,
              "name": "福田欧马可"
            },
            {
              "compared": "1",
              "count": 1,
              "name": "福田试验-研究院 "
            },
            {
              "compared": "-1",
              "count": 1,
              "name": "福田金融"
            },
            {
              "compared": "-1",
              "count": 1,
              "name": "计划与营销管理本部新能源"
            }
          ],
          "desc": "查询车厂端各企业访问情况"
        },
        "functionsUsedByDealer": {
          "functionsUsedList": [
            {
              "compared": "1",
              "count": 1846,
              "name": "车辆位置"
            },
            {
              "compared": "-1",
              "count": 1656,
              "name": "首页"
            },
            {
              "compared": "-1",
              "count": 1624,
              "name": "运营数据"
            },
            {
              "compared": "-1",
              "count": 620,
              "name": "锁车解锁"
            },
            {
              "compared": "-1",
              "count": 279,
              "name": "车辆注册"
            },
            {
              "compared": "-1",
              "count": 259,
              "name": "指令记录"
            },
            {
              "compared": "1",
              "count": 233,
              "name": "领导看板"
            },
            {
              "compared": "1",
              "count": 167,
              "name": "单车分析"
            },
            {
              "compared": "1",
              "count": 148,
              "name": "行驶分析"
            },
            {
              "compared": "1",
              "count": 50,
              "name": "运营分析"
            },
            {
              "compared": "-1",
              "count": 43,
              "name": "在途监控"
            },
            {
              "compared": "-1",
              "count": 37,
              "name": "实时数据"
            },
            {
              "compared": "0",
              "count": 28,
              "name": "离线车辆"
            },
            {
              "compared": "-1",
              "count": 19,
              "name": "账号管理"
            },
            {
              "compared": "-1",
              "count": 8,
              "name": "驾驶行为"
            },
            {
              "compared": "1",
              "count": 5,
              "name": "车辆监控"
            },
            {
              "compared": "-1",
              "count": 3,
              "name": "岗位授权"
            },
            {
              "compared": "1",
              "count": 3,
              "name": "角色设置"
            },
            {
              "compared": "-1",
              "count": 1,
              "name": "岗位设置"
            },
            {
              "compared": "1",
              "count": 1,
              "name": "按车型及月份"
            },
            {
              "compared": "-1",
              "count": 1,
              "name": "离线分析"
            },
            {
              "compared": "-1",
              "count": 1,
              "name": "部门设置"
            }
          ],
          "desc": "查询经销商端常用功能"
        },
        "productRankingWeek": {
          "list": [
            {
              "companyNum": 3630,
              "productName": "经销商车联网平台"
            },
            {
              "companyNum": 327,
              "productName": "欧曼服务车车联网平台"
            },
            {
              "companyNum": 142,
              "productName": "金融车联网平台"
            },
            {
              "companyNum": 48,
              "productName": "欧辉车联网平台"
            },
            {
              "companyNum": 45,
              "productName": "新能源车联网平台"
            },
            {
              "companyNum": 10,
              "productName": "试验车车联网平台"
            },
            {
              "companyNum": 8,
              "productName": "雷萨重机车联网平台"
            },
            {
              "companyNum": 5,
              "productName": "欧曼车联网平台"
            },
            {
              "companyNum": 4,
              "productName": "车联网价值链应用平台"
            },
            {
              "companyNum": 3,
              "productName": "欧马可车联网平台"
            },
            {
              "companyNum": 3,
              "productName": "车桥供应商车联网平台"
            },
            {
              "companyNum": 3,
              "productName": "发动机供应商车联网平台"
            },
            {
              "companyNum": 2,
              "productName": "变速箱供应商车联网平台"
            },
            {
              "companyNum": 1,
              "productName": "公务车车联网平台"
            },
            {
              "companyNum": 1,
              "productName": "车联网增值服务系统"
            },
            {
              "companyNum": 1,
              "productName": "时代车联网平台"
            },
            {
              "companyNum": 1,
              "productName": "试制试验车联网平台"
            },
            {
              "companyNum": 1,
              "productName": "物流车联网平台V2"
            },
            {
              "companyNum": 1,
              "productName": "伽途车联网平台"
            },
            {
              "companyNum": 1,
              "productName": "图雅诺车联网平台"
            },
            {
              "companyNum": 1,
              "productName": "福田汽车车联网平台"
            },
            {
              "companyNum": 1,
              "productName": "ABS供应商车联网平台"
            },
            {
              "companyNum": 1,
              "productName": "中兴OBD测试平台"
            },
            {
              "companyNum": 1,
              "productName": "福田落地运营服务平台2"
            },
            {
              "companyNum": 1,
              "productName": "奥铃车联网平台"
            },
            {
              "companyNum": 1,
              "productName": "普罗科车联网平台"
            },
            {
              "companyNum": 1,
              "productName": "轻型商务车车联网平台"
            },
            {
              "companyNum": 1,
              "productName": "物流车联网平台"
            },
            {
              "companyNum": 1,
              "productName": "运营平台"
            },
            {
              "companyNum": 1,
              "productName": "起重机车联网平台"
            },
            {
              "companyNum": 1,
              "productName": "终端运营服务平台"
            }
          ],
          "desc": "开通企业最多的产品的排行"
        },
        "platformInfoWeek": {
          "beforeWeekMap": {
            "companyNum": 4239,
            "userNum": 8957,
            "productNum": 33
          },
          "lastWeekMap": {
            "companyNum": 4248,
            "userNum": 9006,
            "productNum": 33
          },
          "desc": "平台概况"
        },
        "visitStatisticsProduct": {
          "productVisitList": [
            {
              "compared": "1",
              "count": 694,
              "name": "物流车联网平台V2"
            },
            {
              "compared": "1",
              "count": 81,
              "name": "经销商车联网平台"
            },
            {
              "compared": "1",
              "count": 76,
              "name": "欧曼车联网平台"
            },
            {
              "compared": "1",
              "count": 20,
              "name": "福田落地运营服务平台2"
            },
            {
              "compared": "-1",
              "count": 15,
              "name": "雷萨重机车联网平台"
            },
            {
              "compared": "1",
              "count": 12,
              "name": "运营平台"
            },
            {
              "compared": "1",
              "count": 10,
              "name": "福田汽车车联网平台"
            },
            {
              "compared": "-1",
              "count": 9,
              "name": "新能源车联网平台"
            },
            {
              "compared": "1",
              "count": 8,
              "name": "终端运营服务平台"
            },
            {
              "compared": "0",
              "count": 5,
              "name": "车联网价值链应用平台"
            },
            {
              "compared": "1",
              "count": 3,
              "name": "试制试验车联网平台"
            },
            {
              "compared": "1",
              "count": 2,
              "name": "发动机供应商车联网平台"
            },
            {
              "compared": "-1",
              "count": 2,
              "name": "物流车联网平台"
            },
            {
              "compared": "1",
              "count": 1,
              "name": "奥铃车联网平台"
            },
            {
              "compared": "1",
              "count": 1,
              "name": "欧辉车联网平台"
            },
            {
              "compared": "1",
              "count": 1,
              "name": "欧马可车联网平台"
            },
            {
              "compared": "1",
              "count": 1,
              "name": "试验车车联网平台"
            },
            {
              "compared": "-1",
              "count": 1,
              "name": "金融车联网平台"
            }
          ],
          "desc": "查询车联网产品访问排行"
        }
      } as IProductData;
      component.dataService.renderReportData();
      component.reportData = component.dataService.reportData as IProductData;
      component.bindData();
      fixture.detectChanges();
    });
    it('车联网平台概况', () => {
      const $total_info = fixture.debugElement.query(By.css('.total-info')).children;
      let values = $total_info.map($elem => {
        return $elem.attributes['data-value'];
      });
      let titleList = ['productNum', 'companyNum', 'userNum'];
      let sourceValues = titleList.map(ele => [component.reportData.platformInfoWeek.lastWeekMap[ele], component.reportData.platformInfoWeek.lastWeekMap[ele] - component.reportData.platformInfoWeek.beforeWeekMap[ele]]);

      expect(values.join()).toEqual(sourceValues.join());
    });
    it('开通企业排行TOP10-前10条', () => {
      const $total_info = fixture.debugElement.query(By.css('.sort-list')).children;
      let sortList = component.reportData.productRankingWeek.list.sort((a, b) => {
        return b.companyNum - a.companyNum;
      }).slice(0, 10).map(ele => {
        return {
          title: ele.productName,
          progress: ele.companyNum + ''
        };
      });
      expect($total_info[0].context.ngForOf.join()).toEqual(sortList.join());
      expect($total_info.length).toEqual(10);
    });
    it('用户访问统计', () => {
      const $total_info = fixture.debugElement.queryAll(By.css('.chart-detail span'))[0];
      let visitChartData = [
        {
          name: '本周',
          percents: Object.values(component.reportData.visitStatisticsWeek.lastWeekVisit)
        },
        {
          name: '上周',
          percents: Object.values(component.reportData.visitStatisticsWeek.beforeLastWeekVisit)
        }
      ];
      let chartSum = component.getChartSum(visitChartData, Object.keys(component.reportData.visitStatisticsWeek.lastWeekVisit));

      expect($total_info.nativeElement.innerHTML).toEqual(chartSum.sum + '次');
    });
    it('按产品统计用户访问排行TOP10-前10条', () => {
      const $total_info = fixture.debugElement.query(By.css('.visit-list')).children;
      let sortList = component.reportData.visitStatisticsProduct.productVisitList.sort((a, b) => {
        return b.count - a.count;
      }).slice(0, 10).map(ele => {
        return {
          title: ele.name,
          lift: component.lifts[Number(ele.compared) + 1],
          progress: ele.count + ''
        };
      });

      expect($total_info[0].context.ngForOf.join()).toEqual(sortList.join());
      expect($total_info.length).toEqual(10);
    });
    it('按企业统计用户访问情况-车厂端使用率', () => {
      const $total_info = fixture.debugElement.queryAll(By.css('.com-use-title-com p'));
      let arr = $total_info.map(ele => (ele.nativeElement.innerHTML));

      expect(arr[0]).toEqual('车厂端使用率');
      expect(arr[1]).toEqual(`使用企业数量：${component.reportData.visitStatisticsFactory.lastCompanyVisitTotal}`);
      expect(arr[2]).toEqual(`未使用企业数量：${component.reportData.visitStatisticsFactory.lastCompanyTotal - component.reportData.visitStatisticsFactory.lastCompanyVisitTotal}`);
    });
    it('按企业统计用户访问情况-经销商端使用率', () => {
      const $total_info = fixture.debugElement.queryAll(By.css('.com-use-title-de p'));
      let arr = $total_info.map(ele => (ele.nativeElement.innerHTML));

      expect(arr[0]).toEqual('经销商端使用率');
      expect(arr[1]).toEqual(`使用企业数量：${component.reportData.visitStatisticsDealer.lastCompanyVisitTotal}`);
      expect(arr[2]).toEqual(`未使用企业数量：${component.reportData.visitStatisticsDealer.lastCompanyTotal - component.reportData.visitStatisticsDealer.lastCompanyVisitTotal}`);
    });
    it('经销商端用户访问排名TOP5-前5条', () => {
      const $total_info = fixture.debugElement.query(By.css('.list-sort')).children;
      let sortList = component.reportData.visitStatisticsDealer.companyVisitList.sort((a, b) => {
        return b.count - a.count;
      }).slice(0, 5).map(ele => {
        return {
          title: ele.name,
          progress: ele.count + '',
          lift: component.lifts[Number(ele.compared) + 1]
        };
      });
      expect($total_info[0].context.ngForOf.join()).toEqual(sortList.join());
      expect($total_info.length).toEqual(5);
    });
    it('车厂端常用功能用户访问统计TOP10-前10条', () => {
      const $total_info = fixture.debugElement.query(By.css('.park-list')).children;
      let functionsUsedByFactoryData = component.getPark(component.reportData.functionsUsedByFactory);

      expect($total_info[0].context.ngForOf.join()).toEqual(functionsUsedByFactoryData.lists.join());
      expect($total_info.length).toEqual(10);
    });
    it('经销商端常用功能用户访问统计TOP10-前10条', () => {
      const $total_info = fixture.debugElement.query(By.css('.dealer-list')).children;
      let functionsUsedByDealer = component.getPark(component.reportData.functionsUsedByDealer);

      expect($total_info[0].context.ngForOf.join()).toEqual(functionsUsedByDealer.lists.join());
      expect($total_info.length).toEqual(10);
    });
  });
});
