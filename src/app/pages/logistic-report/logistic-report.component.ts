import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ILogisticReportData } from '../../services/data.interface';
import { ITopNavData } from '../../components/top-nav/top-nav.interface';
import { IAccountIfAddData } from '../../components/account-if-add/account-if-add.interface';
import { IBarData } from '../../components/bar/bar.interface';
import { IProgressInterface } from '../../components/progress/progress.interface';
import { ISortListInterface } from '../../components/sort-list/sort-list.interface';
import { ISortInterface } from '../../components/sort/sort.interface';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-logistic-report',
  templateUrl: './logistic-report.component.html',
  styleUrls: ['./logistic-report.component.scss']
})
export class LogisticReportComponent implements OnInit {
  reportData: ILogisticReportData;
  bannerInfo: ITopNavData = {
    endDate: '',
    startDate: '',
    title: `物流大数据报告`,
    platform: '福田车联网平台',
    currentTime: ''
  };
  accountIfAddData: IAccountIfAddData[] = [];

  totalYundanM: Number;
  startRateM: Number;
  endRateM: Number;

  plusData: any[] = [];
  minusData: any[] = [];
  noStartShip3Data: ISortListInterface[] = [];
  delayEndCouncilsRank: ISortListInterface[] = [];
  abMileageCouncilsRank: ISortListInterface[] = [];
  doubtDistCouncilsRank: ISortListInterface[] = [];
  delayBeginCountData: IBarData[] = [];
  delayEndCountData: IBarData[] = [];
  abMileageCountData: IBarData[] = [];
  doubtDistCountData: IBarData[] = [];

  // 运输评价
  brandGoodData: IProgressInterface[] = [];
  brandPoorData: string[] = [];
  departmentGoodData: IProgressInterface[] = [];
  departmentPoorData: string[] = [];
  carrierGoodData: ISortListInterface[] = [];
  carrierPoorData: string[] = [];
  driverGoodData: ISortInterface[] = [];
  driverPoorData: ISortInterface[] = [];

  // 运输情况
  transportConditionData: any[]
  addData = {
    total: 0,
    totalAddNum: 0,
    ontimeBeginRate: 0,
    ontimeEndRate: 0,
    beginRateAdd: 0,
    endRateAdd: 0
  }

  constructor(public dataService: DataService, private pageTitle: Title) {
    this.pageTitle.setTitle(this.bannerInfo.title);
  }

  async ngOnInit() {
    await this.dataService.getReportData();
    this.reportData = this.dataService.reportData as ILogisticReportData;
    if(!this.reportData) return;
    this.bindData();
  }

  bindData() {
    let dateFormate = FOTON_GLOBAL.Date.getDateByFormat;
    // 运输质量评价
    let qe = this.reportData.transportationQualityEvaluation;
    // 品牌
    let brandGradeTop = [];
    if (qe.brandGradeTop.length > 5) {
      brandGradeTop = qe.brandGradeTop.slice(0,5);
    } else {
      brandGradeTop = qe.brandGradeTop;
    }
    brandGradeTop.forEach((val) =>{
      let placeHolder = {
        title: '',
        progress: ''
      };
      placeHolder.title = val.brandName;
      placeHolder.progress = val.brandGrade + '';
      this.brandGoodData.push(placeHolder);
    });

    let brandGradeLast =  [];
    if (qe.brandGradeLast.length > 3) {
      brandGradeLast = qe.brandGradeLast.slice(0,3);
    } else {
      brandGradeLast = qe.brandGradeLast;
    }
    brandGradeLast.forEach((val) => {
      this.brandPoorData.push(val.brandName);
    })

    // 物流部
    let orgGradeTop = [];
    if (qe.orgGradeTop.length > 5) {
      orgGradeTop = qe.orgGradeTop.slice(0,5);
    } else {
      orgGradeTop = qe.orgGradeTop;
    }
    let arrs = [];
    orgGradeTop.forEach((val) =>{
      let placeHolder = {
        title: '',
        progress: ''
      };
      placeHolder.title = val.orgName;
      placeHolder.progress = val.orgGrade + '';
      arrs.push(placeHolder);
    });
    this.departmentGoodData = arrs;
    let orgGradeLast = [];
    if (qe.orgGradeLast.length > 3) {
      orgGradeLast = qe.orgGradeLast.slice(0,3);
    } else {
      orgGradeLast = qe.orgGradeLast;
    }
    orgGradeLast.forEach((val) => {
      this.departmentPoorData.push(val.orgName);
    })
    // 承运商
    let councilsGradeTop = [];
    if (qe.councilsGradeTop.length > 5) {
      councilsGradeTop = qe.councilsGradeTop.slice(0,5);
    } else {
      councilsGradeTop = qe.councilsGradeTop;
    }
    councilsGradeTop.forEach((val) =>{
      let placeHolder = {
        title: '',
        progress: ''
      };
      placeHolder.title = val.councilsName;
      placeHolder.progress = val.councilsGrade + '';
      this.carrierGoodData.push(placeHolder);
    });
    let councilsGradeLast = [];
    if (qe.councilsGradeLast.length > 3) {
      councilsGradeLast = qe.councilsGradeLast.slice(0,3);
    } else {
      councilsGradeLast = qe.councilsGradeLast;
    }
    councilsGradeLast.forEach((val) => {
      this.carrierPoorData.push(val.councilsName);
    })
    // 司机
    let top3Driver = [];
    if (qe.driverGradeTop.length > 10){
      top3Driver = qe.driverGradeTop.slice(0,10);
    } else {
      top3Driver = qe.driverGradeTop
    }
    top3Driver.forEach((val) =>{
      let placeHolder = {
        title: '',
        progress: '',
        waybillNumber: ''
      };
      placeHolder.title = val.driverName;
      placeHolder.progress = val.driverGrade + '';
      placeHolder.waybillNumber = val.receiptNum + '';
      this.driverGoodData.push(placeHolder);
    });

    let driverGradeLast = [];
    if (qe.driverGradeLast.length > 10) {
      driverGradeLast = qe.driverGradeLast.slice(0,10);
    } else {
      driverGradeLast = qe.driverGradeLast;
    }
    driverGradeLast.forEach((val) => {
      let placeHolder = {
        title: '',
        progress: '',
        waybillNumber: ''
      };
      placeHolder.title = val.driverName;
      placeHolder.progress = val.driverGrade + '';
      placeHolder.waybillNumber = val.receiptNum + '';
      this.driverPoorData.push(placeHolder);
    });

    this.bannerInfo = {
      title:`物流大数据报告` ,
      platform: '福田车联网平台',
      startDate: dateFormate(this.reportData.startDate, 'yyyy.MM.dd'),
      endDate: dateFormate(this.reportData.endDate, 'yyyy.MM.dd'),
      className: 'logistic-report',
      currentTime: dateFormate(this.reportData.currentTime, 'yyyy.MM.dd HH:mm:ss'),
    };

    this.pageTitle.setTitle(this.bannerInfo.title);

    // 运输资源

    let transResource = this.reportData.transportResources;
    let arr = new Array(6);
    /* todo 添加else */
    for ( let k in transResource) {
      let frame = {
        name: '',
        numberVal: [],
        valueKey: ''
      }
      if (k == 'companyBranchNum') {
        frame.name = "分公司(家)";
        frame.numberVal = transResource[k];
        frame.valueKey = 'companyBranchNum';
        arr[0] = frame;
      } else if (k == 'logDepartmentNum') {
        frame.name = "物流部(个)";
        frame.numberVal = transResource[k];
        frame.valueKey = 'logDepartmentNum';
        arr[1] = frame;
      } else if (k == 'councilsNum') {
        frame.name = "承运商(家)";
        frame.numberVal = transResource[k];
        frame.valueKey = 'councilsNum';
        arr[2] = frame;
      } else if (k == 'driverNum') {
        frame.name = "司机(名)";
        frame.numberVal = transResource[k];
        frame.valueKey = 'driverNum';
        arr[3] = frame;
      } else if (k == 'transportRouteNum') {
        frame.name = "运输路线(条)";
        frame.numberVal = transResource[k];
        frame.valueKey = 'transportRouteNum';
        arr[4] = frame;
      } else if (k == 'placepointNum') {
        frame.name = "位置标点(个)";
        frame.numberVal = transResource[k];
        frame.valueKey = 'placepointNum';
        arr[5] = frame;
      }
    };
    this.accountIfAddData = arr;
    this.accountIfAddData.forEach( (val) => {
      let newAdd = val.numberVal[1];
      let arr = [];
      if (newAdd > 0) {
        arr.push(val.name.slice(0,-3));
        arr.push(newAdd + val.name.slice(-2,-1));
        this.plusData.push(arr);
      }
    });

    // 运输概况
    this.addData.total = this.reportData.transportSituation.lastWeekTransportSituation.allOrder;
    let pieData = [
      {
        name: "待调度",
        value: 0
      },
      {
        name: "已发车",
        value: 0
      },
      {
        name: "已到达",
        value: 0
      },
      {
        name: "异常运单",
        value: 0
      }
    ]
    let lastPie = this.reportData.transportSituation.lastWeekTransportSituation;
    pieData[0].value = lastPie.waitScheNum;
    pieData[1].value = lastPie.onroadNum;
    pieData[2].value = lastPie.arriveNum;
    pieData[3].value = lastPie.abnormalNum;
    this.transportConditionData = pieData;
    let weekBefore = this.reportData.transportSituation.weekBeforeTransportSituation;

    // 运单总数增加
    // totalYundanM: Boolean;
    // startRateM: Boolean;
    // endRateM: Boolean;
    if (lastPie.allOrder > weekBefore.allOrder) {
      this.totalYundanM = 1;
      this.addData.totalAddNum = lastPie.allOrder - weekBefore.allOrder;
    } else if (lastPie.allOrder < weekBefore.allOrder) {
      this.totalYundanM = -1;
      this.addData.totalAddNum =  weekBefore.allOrder - lastPie.allOrder;
    } else {
      this.totalYundanM = 0;
      this.addData.totalAddNum = 0;
    }

    let rate1 = lastPie.ontimeBeginRate.substr(0, lastPie.ontimeBeginRate.indexOf('%'));
    let rate2 = weekBefore.ontimeBeginRate.substr(0, weekBefore.ontimeBeginRate.indexOf('%'));

    // 及时起运率
    this.addData.ontimeBeginRate = Number(rate1);
    // 及时起运率上涨or下降
    this.addData.beginRateAdd = (Number(rate1) - Number(rate2));
    if ( Number(rate1) > Number(rate2)) {
      this.startRateM = 1;
      this.addData.beginRateAdd = Number(this.accSub(rate1, rate2));
    } else if ( Number(rate1) < Number(rate2) ) {
      this.startRateM = -1;
      this.addData.beginRateAdd = Number(this.accSub(rate2, rate1));
    } else {
      this.startRateM = 0;
      this.addData.beginRateAdd = 0;
    }

    let rate3 = lastPie.ontimeEndRate.substr(0, lastPie.ontimeEndRate.indexOf('%'));
    let rate4 = weekBefore.ontimeEndRate.substr(0, weekBefore.ontimeEndRate.indexOf('%'));
    // 及时送达率
    this.addData.ontimeEndRate = Number(rate3);
    // 及时送达率上涨or下降
    if ( Number(rate3) > Number(rate4)) {
      this.endRateM = 1;
      this.addData.endRateAdd = Number(this.accSub(rate3, rate4));
    } else if ( Number(rate3) < Number(rate4) ) {
      this.endRateM = -1;
      this.addData.endRateAdd = Number(this.accSub(rate4, rate3));
    } else {
      this.endRateM = 0;
      this.addData.endRateAdd = 0;
    }
    // 异常运输
    let ab = this.reportData.abnormalTransportation;
    /* todo 用reportData.days代替 */
    let oneWeek7 = this.reportData.days;

    // 异常运输-起运
    let arr1 = [];
    ab.delayBeginCount.forEach((val, index) => {
      let placeHolder: {
        date: string | number,
        number: any[]
      } = {date: '', number: []}
      placeHolder.date = oneWeek7[index];
      placeHolder.number[0] = val[1];
      placeHolder.number[1] = val[2];
      arr1.push(placeHolder);
    })
    this.delayBeginCountData = arr1;
    this.noStartShip3Data = ab.delayBeginCouncilsRank.slice(0,5).map( (val) => {
      let placeHolder = {title: '', progress: '', note: 0, errNote: 0 };
      placeHolder.title = val.councilsName;
      placeHolder.progress = val.delayBeginRate + '';
      placeHolder.note = val.totalNum;
      placeHolder.errNote = val.delayBeginCount;
      return placeHolder;
    })
    //异常运输-送达
    let arr2 = [];
    ab.delayEndCount.forEach((val, index) => {
      let placeHolder: {
        date: string | number,
        number: any[]
      } = {date: '', number: []}
      placeHolder.date = oneWeek7[index];
      placeHolder.number[0] = val[1];
      placeHolder.number[1] = val[2];
      arr2.push(placeHolder);
    })
    this.delayEndCountData = arr2;
    this.delayEndCouncilsRank = ab.delayEndCouncilsRank.slice(0,5).map( (val) => {
      let placeHolder = {title: '', progress: '', note: 0, errNote: 0 };
      placeHolder.title = val.councilsName;
      placeHolder.progress = val.delayEndRate + '';
      placeHolder.note = val.totalNum;
      placeHolder.errNote = val.delayEndCount;
      return placeHolder;
    })
    //异常运输-里程
    let arr3 = [];
    ab.abMileageCount.forEach((val, index) => {
      let placeHolder: {
        date: string | number,
        number: any[]
      } = {date: '', number: []}
      placeHolder.date = oneWeek7[index];
      placeHolder.number[0] = val[1];
      placeHolder.number[1] = val[2];
      arr3.push(placeHolder);
    })
    this.abMileageCountData = arr3;
    this.abMileageCouncilsRank = ab.abMileageCouncilsRank.slice(0,5).map( (val) => {
      let placeHolder = {title: '', progress: '', note: 0, errNote: 0 };
      placeHolder.title = val.councilsName;
      placeHolder.progress = val.abMileageRate + '';
      placeHolder.note = val.totalNum;
      placeHolder.errNote = val.abMileageCount;
      return placeHolder;
    })

    //异常运输-配货
    let arr4 = [];
    ab.doubtDistCount.forEach((val, index) => {
      let placeHolder: {
        date: string | number,
        number: any[]
      } = {date: '', number: []}
      placeHolder.date = oneWeek7[index];
      placeHolder.number[0] = val[1];
      placeHolder.number[1] = val[2];
      arr4.push(placeHolder);
    })
    this.doubtDistCountData = arr4;

    this.doubtDistCouncilsRank = ab.doubtDistCouncilsRank.map( (val) => {
      let placeHolder = {title: '', progress: '', note: 0, errNote: 0 };
      placeHolder.title = val.councilsName;
      placeHolder.progress = val.doubtDistRate + '';
      placeHolder.note = val.totalNum;
      placeHolder.errNote = val.doubtDistCount;
      return placeHolder;
    })
  }

  accSub (arg1, arg2) {
    let r1, r2, m, n;
    try {r1 = arg1.split('.')[1].length} catch (e) {r1 = 0};
    try {r2 = arg2.split('.')[1].length} catch (e) {r2 = 0};
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1: r2;
    return ((arg1*m-arg2*m)/m).toFixed(n);
  }
}
