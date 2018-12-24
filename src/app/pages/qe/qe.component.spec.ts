import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QeComponent } from './qe.component';
import { SharedModule } from 'src/app/providors/share.module';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { IQeReportData } from 'src/app/services/data.interface';
import { formatNumber } from '@angular/common';

describe('质量大数据报告', () => {
  let component: QeComponent;
  let fixture: ComponentFixture<QeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QeComponent],
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

  it('初始化属性检测', () => {
    expect(component.bannerInfo).toEqual({
      className: 'qe',
      endDate: '',
      startDate: '',
      title: `质量大数据报告`,
      platform: '福田车联网平台',
      currentTime: ''
    });
  });

  describe('没有数据时的页面展示', () => {

    it('报告生成时间为空', () => {
      const $reportCreateTime = fixture.debugElement.query(By.css('.time'));
      expect($reportCreateTime.nativeElement.textContent.trim()).toEqual('报告生成时间:');
    });

    it('车联网采集的故障情况全部显示为0', () => {
      const $values = fixture.debugElement.queryAll(By.css('.only-one'));
      let values = $values.map($elem => {
        return $elem.nativeElement.textContent;
      });
      expect(values.join('')).toEqual('0'.repeat(values.length));
    });
    it('车联网采集的故障情况全部显示为0', () => {
      const $values = fixture.debugElement.queryAll(By.css('.only-one'));
      let values = $values.map($elem => {
        return $elem.nativeElement.textContent;
      });
      expect(values.join('')).toEqual('0'.repeat(values.length));
    });

    it('故障处理情况（概要）全部显示为0', () => {
      const $img_section = fixture.debugElement.query(By.css('.img-text-sheets'));
      let values = Array.from($img_section.nativeElement.getElementsByClassName('sheet-right') as HTMLCollection).map(($elem) => {
        return $elem.getElementsByTagName('span')[0].textContent;
      });
      expect(values.join('')).toEqual('0'.repeat(values.length));
    });

    it('故障处理情况（详情）全部显示为0', () => {
      const $wrapper = fixture.debugElement.query(By.css('.fault-fix-wrapper'));
      let values = Array.from($wrapper.nativeElement.querySelectorAll('.detail>span') as HTMLCollection).map(($elem) => {
        return $elem.textContent.replace(/[^\d]/g, '');
      });
      expect(values.join('')).toEqual('0'.repeat(values.length));
    });

  });

  describe('有数据时的页面展示', () => {

    beforeEach(() => {
      fixture = TestBed.createComponent(QeComponent);
      component = fixture.componentInstance;
      component.dataService.reportData = {
        "faultRatioJson": [
        {
        "car_brand_name": "时代",
        "code": "F000001108016",
        "fmi": "16",
        "description": "OverRun时加电时间超过最大值",
        "source": "000",
        "total": 3404,
        "provider": "武汉品致",
        "source_name": "ECM",
        "max": 393,
        "spn": "1108",
        "name": "OverRun时加电时间高",
        "supplierCompanyName": "EDC17",
        "fc": "P0172"
        },
        {
        "car_brand_name": "欧曼",
        "code": "F000000597002",
        "fmi": "2",
        "description": "油门踏板和刹车踏板信号不合理故障",
        "source": "000",
        "total": 884526,
        "provider": "售后服务",
        "source_name": "ECM",
        "max": 102830,
        "suggest": "暂无",
        "priority": "高",
        "spn": "597",
        "name": "油门踏板和刹车踏板信号不合理故障",
        "supplierCompanyName": "北汽福田汽车股份有限公司北京福田发动机厂"
        },
        {
        "car_brand_name": "欧马可",
        "code": "F033002372018",
        "fmi": "18",
        "description": "主车制动灯故障欠载",
        "source": "033",
        "total": 36320,
        "provider": "售后服务",
        "source_name": "BCM",
        "max": 5649,
        "suggest": "请检查灯泡功率是否在符合规定的功率",
        "priority": "中",
        "spn": "2372",
        "name": "主车制动灯或线路故障",
        "supplierCompanyName": "江苏罗思韦尔电气有限公司"
        },
        {
        "car_brand_name": "雷萨",
        "code": "F000000597002",
        "fmi": "2",
        "description": "油门踏板和刹车踏板信号不合理故障",
        "source": "000",
        "total": 14786,
        "provider": "售后服务",
        "source_name": "ECM",
        "max": 4462,
        "suggest": "暂无",
        "priority": "高",
        "spn": "597",
        "name": "油门踏板和刹车踏板信号不合理故障",
        "supplierCompanyName": "北汽福田汽车股份有限公司北京福田发动机厂"
        },
        {
        "car_brand_name": "全部",
        "code": "F000000597002",
        "fmi": "2",
        "description": "油门踏板和刹车踏板信号不合理故障",
        "source": "000",
        "total": 0,
        "provider": "售后服务",
        "source_name": "ECM",
        "max": 107327,
        "suggest": "暂无",
        "priority": "高",
        "spn": "597",
        "name": "油门踏板和刹车踏板信号不合理故障",
        "supplierCompanyName": "北汽福田汽车股份有限公司北京福田发动机厂"
        }
        ],
        "faultTreatJson": {
        "totalpushed": 613,
        "unprocessed": 612,
        "assigne": 0,
        "processed": 1
        },
        "faultRateJson": [
        {
        "times": [
        "2018-11-12",
        "2018-11-13",
        "2018-11-14",
        "2018-11-15",
        "2018-11-16",
        "2018-11-17",
        "2018-11-18"
        ],
        "car_brand_name": "时代",
        "faultcars": [
        371,
        412,
        383,
        373,
        359,
        360,
        297
        ]
        },
        {
        "times": [
        "2018-11-13",
        "2018-11-14",
        "2018-11-15",
        "2018-11-16",
        "2018-11-17",
        "2018-11-18",
        "2018-11-12"
        ],
        "car_brand_name": "欧曼",
        "faultcars": [
        55224,
        54952,
        55199,
        57000,
        56876,
        55936,
        55140
        ]
        },
        {
        "times": [
        "2018-11-13",
        "2018-11-14",
        "2018-11-15",
        "2018-11-16",
        "2018-11-17",
        "2018-11-18",
        "2018-11-12"
        ],
        "car_brand_name": "欧马可",
        "faultcars": [
        3464,
        3482,
        3483,
        3504,
        3198,
        2818,
        3399
        ]
        },
        {
        "times": [
        "2018-11-13",
        "2018-11-14",
        "2018-11-15",
        "2018-11-16",
        "2018-11-17",
        "2018-11-18",
        "2018-11-12"
        ],
        "car_brand_name": "雷萨",
        "faultcars": [
        1358,
        1298,
        1294,
        1326,
        1322,
        1241,
        1293
        ]
        },
        {
        "times": [
        "2018-11-12",
        "2018-11-13",
        "2018-11-14",
        "2018-11-15",
        "2018-11-16",
        "2018-11-17",
        "2018-11-18"
        ],
        "car_brand_name": "全部",
        "faultcars": [
        62816,
        63014,
        62686,
        62866,
        64793,
        64267,
        62475
        ]
        }
        ],
        "reportDate": {
        "currentTime": 1544486245153,
        "endDate": "2018-11-18",
        "startDate": "2018-11-12"
        },
        "faultLevelJson": [
        {
        "name": "时代",
        "data": [
        4203,
        1611,
        319
        ]
        },
        {
        "name": "欧曼",
        "data": [
        2035388,
        439668,
        472067
        ]
        },
        {
        "name": "欧马可",
        "data": [
        78606,
        38061,
        16297
        ]
        },
        {
        "name": "雷萨",
        "data": [
        15344,
        11893,
        2074
        ]
        },
        {
        "name": "全部",
        "data": [
        2203685,
        512930,
        506938
        ]
        }
        ],
        "faultRankJson": [
        {
        "codecount": 107327,
        "code": "F000000597002",
        "source": "000",
        "source_name": "ECM",
        "name": "油门踏板和刹车踏板信号不合理故障",
        "description": "油门踏板和刹车踏板信号不合理故障",
        "spn": "597",
        "fmi": "2",
        "priority": "高",
        "provider": "售后服务",
        "suggest": "暂无",
        "supplierCompanyName": "北汽福田汽车股份有限公司北京福田发动机厂"
        },
        {
        "codecount": 47315,
        "code": "F000000598002",
        "source": "000",
        "source_name": "ECM",
        "name": "离合器信号不可信",
        "description": "离合器信号不可信（档位变化了，但离合器信号没有相应变化）",
        "spn": "598",
        "fmi": "2",
        "fc": "P003F",
        "provider": "武汉品致",
        "supplierCompanyName": "EDC17"
        },
        {
        "codecount": 26377,
        "code": "F000000097015",
        "source": "000",
        "source_name": "ECM",
        "name": "燃油含水指示灯–数据有效但高于正常工作范围–最低严重级别 ",
        "spn": "97",
        "fmi": "15",
        "priority": "中",
        "provider": "售后服务",
        "suggest": "检查燃油滤清器是否含水",
        "supplierCompanyName": "北京福田康明斯发动机有限公司"
        },
        {
        "codecount": 21169,
        "code": "F000001746009",
        "source": "000",
        "source_name": "ECM",
        "description": "安全装置 - 异常更新率",
        "property": "OEM",
        "spn": "1746",
        "fmi": "9",
        "fc": "4138",
        "priority": "尽快维修",
        "provider": "康明斯中国",
        "suggest": "方便时尽早与康明斯认证的维修点联系安排维修服务，在维修前车辆可以继续使用",
        "supplierCompanyName": "康明斯",
        "instructionToOperator": "司机指导：需要立即处理，将车停到安全的地方（严重降扭发生在车速为0后，根据实际情况车可以多开一会），点火钥匙关闭，保持大电停留60s，再打开点火钥匙，一次或几次操作，故障消失即可，不用进一步处理。故障仍激活，请联系服务。注意：车有锁车功能时，认为拆除锁车模块会造成此故障，从而诱发车被锁（严重降扭）。",
        "instructionToFleetMgr": "方便时尽早与康明斯认证的维修点联系安排维修服务，在维修前车辆可以继续使用"
        },
        {
        "codecount": 20408,
        "code": "F011000792007",
        "source": "011",
        "source_name": "ABS",
        "name": "驱动桥右轮轮速传感器 机械系统无响应或者失调 ",
        "spn": "792",
        "fmi": "7",
        "priority": "低",
        "provider": "售后服务",
        "suggest": "检查传感器与齿圈的间隙是不是太大，如果太大，使传感器后部完全受力推向齿圈侧；\n测量传感器与线缆的电阻，电阻正常区间为900-2000 欧姆（接插件-管脚：X1-10 和X1-11）；\n检查制动的机械部件（制动拖拽、雍塞）\n验证步骤：\n清除诊断故障码。通过EOL 工具或者开动车辆来验证轮速传感器信号；\n传感器的诊断故障码会一直存在（未操作清除诊断故障码）除非：\nABS 电控单元上电后，车速大于15-20km/h，ABS 能接收到所有轮速传感器发出的正常数\n据",
        "supplierCompanyName": "东科克诺尔商用车制动系统（十堰）有限公司"
        },
        {
        "codecount": 20036,
        "code": "F011000792005",
        "source": "011",
        "source_name": "ABS",
        "name": "驱动桥右轮轮速传感器 电流低于正常值或者开路 ",
        "spn": "792",
        "fmi": "5",
        "priority": "低",
        "provider": "售后服务",
        "suggest": "传感器与齿圈之间的间隙太大；\n传感器的输出交流电压，在0.5revs/sec 时感应电压最小值应为0.25V。（接插件-管脚：X1-10\n和X1-11）。如果电压太小，使传感器后部完全受力推向齿圈侧；\n核实适当的轴承轴向间隙；\n检查传感器头状态；\n检查电控单元与传感器之间的接插件和线束有无损坏或者腐蚀；\n验证步骤：\n清除诊断故障码。通过EOL 工具或者开动车辆来验证轮速传感器信号；\n传感器的诊断故障码会一直存在（未操作清除诊断故障码）除非：\nABS 电控单元上电后，车速大于15-20km/h，ABS 能接收到所有轮速传感器发出的正常数\n据",
        "supplierCompanyName": "东科克诺尔商用车制动系统（十堰）有限公司"
        },
        {
        "codecount": 18899,
        "code": "F011000791007",
        "source": "011",
        "source_name": "ABS",
        "name": "驱动桥左轮轮速传感器 机械系统无响应或者失调 ",
        "description": "驱动桥左轮轮速传感器 机械系统无响应或者失调 ",
        "spn": "791",
        "fmi": "7",
        "priority": "低",
        "provider": "售后服务",
        "suggest": "检查传感器与齿圈的间隙是不是太大，如果太大，使传感器后部完全受力推向齿圈侧；\n测量传感器与线缆的电阻，电阻正常区间为900-2000 欧姆（接插件-管脚：X2-15 和X2-18）；\n检查制动的机械部件（制动拖拽、雍塞）\n验证步骤：\n清除诊断故障码。通过EOL 工具或者开动车辆来验证轮速传感器信号；\n传感器的诊断故障码会一直存在（未操作清除诊断故障码）除非：\nABS 电控单元上电后，车速大于15-20km/h，ABS 能接收到所有轮速传感器发出的正常数\n据",
        "supplierCompanyName": "东科克诺尔商用车制动系统（十堰）有限公司"
        },
        {
        "codecount": 17518,
        "code": "F011000792010",
        "source": "011",
        "source_name": "ABS",
        "name": "驱动桥右轮轮速传感器 不正常的变化率 ",
        "spn": "792",
        "fmi": "10",
        "priority": "低",
        "provider": "售后服务",
        "suggest": "检查轮胎型号是否与车辆要求装配的一致；\n检查C3 信号校准，检查车速表是否有额外的故障码；检查所有齿圈上的齿数；\n验证步骤：\n清除诊断故障码。通过EOL 工具或者开动车辆来验证轮速传感器信号；\n传感器的诊断故障码会一直存在（未操作清除诊断故障码）除非：\nABS 电控单元上电后，车速大于15-20km/h，ABS 能接收到所有轮速传感器发出的正常数\n据",
        "supplierCompanyName": "东科克诺尔商用车制动系统（十堰）有限公司"
        },
        {
        "codecount": 16636,
        "code": "F011000797005",
        "source": "011",
        "source_name": "ABS",
        "name": "驱动桥左轮压力控制阀 电流低于正常值或者开路 ",
        "spn": "797",
        "fmi": "5",
        "priority": "中",
        "provider": "售后服务",
        "suggest": "检查压力控制阀的线束及接插件\n证步骤：\n清除诊断故障码。",
        "supplierCompanyName": "东科克诺尔商用车制动系统（十堰）有限公司"
        },
        {
        "codecount": 16082,
        "code": "F011000791010",
        "source": "011",
        "source_name": "ABS",
        "name": "ABS&ESC/P故障",
        "spn": "791",
        "fmi": "10",
        "priority": "高",
        "provider": "售后服务",
        "suggest": "调整传感器间隙，检查传感器线束，防止断接，转动车轮，检测传感器的输出信号，是否满足WABCO的要求",
        "supplierCompanyName": "威伯科汽车控制系统(中国)有限公司,东科克诺尔商用车制动系统（十堰）有限公司"
        }
        ],
        "faultTypeJson": [
        {
        "source": "003",
        "source_count": 10268,
        "source_name": "AMT"
        },
        {
        "source": "011",
        "source_count": 2502544,
        "source_name": "ABS"
        },
        {
        "source": "000",
        "source_count": 2732553,
        "source_name": "ECM"
        },
        {
        "source": "016",
        "source_count": 440,
        "source_name": "RET"
        },
        {
        "source": "047",
        "source_count": 840,
        "source_name": "ECAS"
        },
        {
        "source": "236",
        "source_count": 4620,
        "source_name": "DCM"
        },
        {
        "source": "051",
        "source_count": 674,
        "source_name": "TPMS"
        },
        {
        "source": "033",
        "source_count": 22652,
        "source_name": "BCM"
        }
        ],
        "faultRateCountJson": [
        {
        "name": "萨普",
        "code": "A05",
        "num": 1,
        "mileage": 109500,
        "work_time": 33459,
        "location_points": 614,
        "can_points": 1122,
        "charge_power": 0,
        "charge_count": 0,
        "uncharge_count": 0
        },
        {
        "name": "普罗科",
        "code": "A27",
        "num": 1,
        "mileage": 541100,
        "work_time": 159756,
        "location_points": 5933,
        "can_points": 5933,
        "charge_power": 0,
        "charge_count": 0,
        "uncharge_count": 0
        },
        {
        "name": "风景",
        "code": "A07",
        "num": 192,
        "mileage": 16253000,
        "work_time": 2195460,
        "location_points": 1229453,
        "can_points": 1233120,
        "charge_power": 0,
        "charge_count": 0,
        "uncharge_count": 0
        },
        {
        "name": "工程车",
        "code": "A12",
        "num": 4221,
        "mileage": 2838367000,
        "work_time": 1180239798,
        "location_points": 29759017,
        "can_points": 0
        },
        {
        "name": "瑞沃",
        "code": "A26",
        "num": 5655,
        "mileage": 5392085000,
        "work_time": 1007690883,
        "location_points": 33479811,
        "can_points": 72530548,
        "charge_power": 0,
        "charge_count": 0,
        "uncharge_count": 0
        },
        {
        "name": "时代",
        "code": "A08",
        "num": 6368,
        "mileage": 4643344790,
        "work_time": 687805488,
        "location_points": 27691751,
        "can_points": 94369554,
        "charge_power": 0,
        "charge_count": 0,
        "uncharge_count": 0
        },
        {
        "name": "雷萨",
        "code": "A16",
        "num": 7644,
        "mileage": 4749644664,
        "work_time": 1560288395,
        "location_points": 80758925,
        "can_points": 154150582,
        "charge_power": 0,
        "charge_count": 0,
        "uncharge_count": 0
        },
        {
        "name": "欧辉",
        "code": "A14",
        "num": 11103,
        "mileage": 9955843149,
        "work_time": 1266424115,
        "location_points": 184639185,
        "can_points": 229020644,
        "charge_power": 22432.67,
        "charge_count": 717,
        "uncharge_count": 725
        },
        {
        "name": "奥铃",
        "code": "A01",
        "num": 19708,
        "mileage": 21166975605,
        "work_time": 2176217371,
        "location_points": 150308908,
        "can_points": 397668539,
        "charge_power": 0,
        "charge_count": 0,
        "uncharge_count": 0
        },
        {
        "name": "欧马可",
        "code": "A02",
        "num": 24774,
        "mileage": 30173096821,
        "work_time": 3273703823,
        "location_points": 199696587,
        "can_points": 556650814,
        "charge_power": 0,
        "charge_count": 0,
        "uncharge_count": 0
        },
        {
        "name": "欧曼",
        "code": "A09",
        "num": 251492,
        "mileage": 468891394162,
        "work_time": 62541515257,
        "location_points": 2181400342,
        "can_points": 6137981651,
        "charge_power": 0,
        "charge_count": 0,
        "uncharge_count": 0
        }
        ],
        "type": "carBrand",
        "faultProfileJson": {
        "runmileagecount": 549577331.438,
        "faultpercar": 2.8766130331,
        "faultcount": 964350,
        "faultpermileage": 1.7547121,
        "carcount": 127939
        }
      } as IQeReportData;
      component.dataService.renderReportData();
      component.reportData = component.dataService.reportData as IQeReportData;
      component.bindData();
      fixture.detectChanges();
    });

    it('车联网采集的故障情况', () => {
      const $total_info = fixture.debugElement.query(By.css('.total-info'));

      let values = Array.from($total_info.nativeElement.querySelectorAll('div') as HTMLCollection).map($elem => {
        return $elem.getAttribute('data-value');
      });
      let sourceValues = component.summaryData.map(elem => component.reportData.faultProfileJson[elem.valueKey]);

      expect(values.join()).toEqual(sourceValues.join());
    });

    it('按电控模块故障占比加载成功', () => {
      const $wrapper = fixture.debugElement.query(By.css('.order-by-fault-type-list'));
      let $lis = $wrapper.nativeElement.getElementsByTagName('li');

      expect($lis.length).toEqual(component.reportData.faultTypeJson.filter(e => e.source_name).length);
    });

    it('按品牌统计故障占比加载成功', () => {
      const $wrapper = fixture.debugElement.query(By.css('.fault-percent-by-type-list'));
      let $lis = $wrapper.nativeElement.querySelectorAll('li');

      expect($lis.length).toEqual(component.reportData.faultLevelJson.length);
    });

    it('按品牌统计故障率趋势加载成功', () => {
      const $wrapper = fixture.debugElement.query(By.css('.fault-percent-by-type-chart'));

      expect($wrapper.nativeElement.offsetHeight > 10).toBeTruthy();
    });

    it('按故障码统计情况加载成功', () => {
      const $wrapper = fixture.debugElement.query(By.css('.fault-count-list'));
      let $lis = $wrapper.nativeElement.querySelectorAll('app-sort-list>div');

      expect($lis.length).toEqual(10);
    });

    it('故障处理情况（概要）显示正确', () => {
      const $img_section = fixture.debugElement.query(By.css('.img-text-sheets'));
      let values = Array.from($img_section.nativeElement.getElementsByClassName('sheet-right') as HTMLCollection).map(($elem) => {
        return Number($elem.getElementsByTagName('span')[0].textContent);
      });
      let sourceValues = component.faultFixList.map((elem, i) => {
        return i === 0 ? component.reportData.faultProfileJson[elem.valueKey] : component.reportData.faultTreatJson[elem.valueKey];
      });
      expect(values.join()).toBe(sourceValues.join());
    });

    it('故障处理情况（详情）显示正确', () => {
      const $wrapper = fixture.debugElement.query(By.css('.fault-fix-wrapper'));
      let values = Array.from($wrapper.nativeElement.querySelectorAll('.detail>span') as HTMLCollection).map(($elem) => {
        return Number($elem.textContent.replace(/[^\d\.]/g, ''));
      });
      expect(values[0]).toBe(component.reportData.faultProfileJson.faultcount);
      expect(values[1]).toBe(component.reportData.faultTreatJson.processed);
      let v = component.reportData.faultTreatJson.processed/component.reportData.faultProfileJson.faultcount * 100;
      expect(values[2]+'').toBe(formatNumber(v, 'en-US', '1.0-1'));
      expect(values[3]).toBe(component.reportData.faultTreatJson.unprocessed);
      v = component.reportData.faultTreatJson.unprocessed/component.reportData.faultProfileJson.faultcount * 100
      expect(values[4]+'').toBe(formatNumber(v, 'en-US', '1.0-1'));
    });
  });
});