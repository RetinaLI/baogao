import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServeComponent } from './serve.component';
import { SharedModule } from 'src/app/providors/share.module';
import { HttpClientModule } from '@angular/HttpClient';
import { By } from '@angular/platform-browser';
import { IServeReportData } from 'src/app/services/data.interface';
import { formatNumber } from '@angular/common';

describe('服务大数据报告', () => {
  let component: ServeComponent;
  let fixture: ComponentFixture<ServeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServeComponent ],
      imports: [SharedModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('初始化属性检测', () => {
    expect(component.bannerInfo).toEqual({
      endDate: '',
      startDate: '',
      title: `服务大数据报告`,
      platform: '福田车联网平台',
      currentTime: ''
    });
  });

  describe('没有数据时的页面展示', () => {

    it('报告生成时间为空', () => {
      const $reportCreateTime = fixture.debugElement.query(By.css('.time'));
      expect($reportCreateTime.nativeElement.textContent.trim()).toEqual('报告生成时间:');
    });

    it('车辆在站统计（概要）全部显示为0', () => {
      const $values = fixture.debugElement.queryAll(By.css('.only-one'));
      let values = $values.map($elem => {
        return $elem.nativeElement.textContent;
      });
      expect(values.join('')).toEqual('0'.repeat(values.length));
    });

    it('按品牌统计车辆服务情况table全部显示为0', () => {
      const $table = fixture.debugElement.query(By.css('table'));
      let $tr = $table.nativeElement.querySelectorAll('tr');
      expect($tr.length).toEqual(1);
    });

    it('服务真实性统计全部显示为0', () => {
      const $img_section = fixture.debugElement.query(By.css('.img-text-sheets'));
      let values = Array.from($img_section.nativeElement.getElementsByClassName('sheet-right') as HTMLCollection).map(($elem) => {
        return $elem.getElementsByTagName('span')[0].textContent;
      });
      expect(values.join('')).toEqual('0'.repeat(values.length));
    });

    it('故障推送及处理情况全部显示为0', () => {
      const $totle = fixture.debugElement.query(By.css('.totle'));
      expect($totle.nativeElement.textContent.trim()).toEqual('0');

      const $img_section = fixture.debugElement.query(By.css('.img-text-sheets'));
      let values = Array.from($img_section.nativeElement.getElementsByClassName('sheet-right') as HTMLCollection).map(($elem) => {
        return $elem.getElementsByTagName('span')[0].textContent;
      });
      expect(values.join('')).toEqual('0'.repeat(values.length));
    });

  })

  describe('有数据时的页面展示', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ServeComponent);
      component = fixture.componentInstance;
      component.dataService.reportData = {
        "currentTime":1540532973976,
        "optionWeekInboundInfo":{
          "brandJSONArray":[
            {"brandName":"欧马可","vehicleCount":5372,"avgInFenceTime":12.29,"inFenceCount":19405},
            {"brandName":"萨普","vehicleCount":1,"avgInFenceTime":5.58,"inFenceCount":26},
            {"brandName":"时代","vehicleCount":1173,"avgInFenceTime":7.47,"inFenceCount":4766},
            {"brandName":"奥铃","vehicleCount":4959,"avgInFenceTime":14.42,"inFenceCount":19268},
            {"brandName":"欧曼","vehicleCount":52446,"avgInFenceTime":7.13,"inFenceCount":180496},
            {"brandName":"欧辉","vehicleCount":1423,"avgInFenceTime":3.39,"inFenceCount":13738},
            {"brandName":"风景","vehicleCount":22,"avgInFenceTime":9.69,"inFenceCount":124},
            {"brandName":"雷萨","vehicleCount":1226,"avgInFenceTime":4.73,"inFenceCount":6220},
            {"brandName":"瑞沃","vehicleCount":931,"avgInFenceTime":6.53,"inFenceCount":4190}
          ],
          "totalJson":{
            "vehicleCount":67553,
            "avgInFenceTime":7.83,
            "inFenceCount":248233
          }
        },
        "reportDate":{
          "endDate":"2018/10/07",
          "startDate":"2018/10/01"
        },
        "subscTemplateName":"服务大数据报告",
        "optionWeekTruthInfo":{
          "truthInfo":{
            "notRealNum":2007,
            "realNum":6365,
            "totalNum":10130,
            "faultIdenticalNum":0,
            "unableJudgeFaultNum":1004,
            "faultToCheckNum":7370
          },
          "truthInfoByBrand":[
            {"brandName":"奥铃","brandNotRealNum":61,"brandTotalNum":277},
            {"brandName":"时代","brandNotRealNum":35,"brandTotalNum":90},
            {"brandName":"欧曼","brandNotRealNum":1787,"brandTotalNum":8247},
            {"brandName":"欧马可","brandNotRealNum":70,"brandTotalNum":373},
            {"brandName":"瑞沃","brandNotRealNum":15,"brandTotalNum":56},
            {"brandName":"雷萨","brandNotRealNum":39,"brandTotalNum":111}
          ]
        },
        "type":"carBrand",
        "loadWeekTroubleshooting":{
          "troubleshooting":{
            "totalpushed":388,
            "unprocessed":388,
            "assigne":0,
            "processed":0
          }
        }
      } as IServeReportData;
      component.dataService.renderReportData();
      component.reportData = component.dataService.reportData as IServeReportData;
      component.bindData();
      fixture.detectChanges();
    })

    it('车辆在线统计（概况）加载成功', () => {
      const $total_info = fixture.debugElement.query(By.css('.total-info'));
      let values = Array.from($total_info.nativeElement.querySelectorAll('div') as HTMLCollection).map($elem => {
        return $elem.getAttribute('data-value');
      });
      let sourceValues = component.summaryData.map(elem => component.reportData.optionWeekInboundInfo.totalJson[elem.key]);
      expect(values.join()).toEqual(sourceValues.join());
    });

    it('按品牌统计车辆服务情况table加载成功', () => {
      const $wrapper = fixture.debugElement.query(By.css('table'));
      let $tr = $wrapper.nativeElement.querySelectorAll('tr');
      expect($tr.length).toEqual(8);
    });

    it('服务真实性统计（图表）加载成功', () => {
      const $wrapper = fixture.debugElement.query(By.css('.serve-facticity-chart'));
      expect($wrapper.nativeElement.offsetHeight > 10).toBeTruthy();
    });

    it('服务真实性统计（概况）加载成功', () => {
      const $img_section = fixture.debugElement.query(By.css('.img-text-sheets'));
      let values = Array.from($img_section.nativeElement.getElementsByClassName('sheet-right') as HTMLCollection).map(($elem) => {
        return Number($elem.getElementsByTagName('span')[0].textContent);
      });
      let sourceValues = component.facticityList.map((elem, i) => {
        return i === 3 ? (component.reportData.optionWeekTruthInfo.truthInfo.totalNum - component.reportData.optionWeekTruthInfo.truthInfo.realNum - component.reportData.optionWeekTruthInfo.truthInfo.notRealNum) : component.reportData.optionWeekTruthInfo.truthInfo[elem.key];
      });
      expect(values.join()).toBe(sourceValues.join());
    })

    it('按品牌统计车辆服务不真实情况加载成功', () => {
      const $wrapper = fixture.debugElement.query(By.css('.progress-box'));
      let $lis = $wrapper.nativeElement.querySelectorAll('.progress-content');
      expect($lis.length).toEqual(5);
    });

    it('故障推送及处理情况加载成功', () => {
      const $totle = fixture.debugElement.query(By.css('.active-info .totle'));
      expect($totle.nativeElement.textContent).toEqual(component.reportData.loadWeekTroubleshooting.troubleshooting.totalpushed + '');

      const $img_section = fixture.debugElement.query(By.css('.active-serve .img-text-sheets'));
      let values = Array.from($img_section.nativeElement.getElementsByClassName('sheet-right') as HTMLCollection).map(($elem) => {
        return Number($elem.getElementsByTagName('span')[0].textContent);
      });
      let sourceValues = component.activeList.map(elem=> {
        return component.reportData.loadWeekTroubleshooting.troubleshooting[elem.key];
      });
      expect(values.join()).toBe(sourceValues.join());
    })
  })

});
