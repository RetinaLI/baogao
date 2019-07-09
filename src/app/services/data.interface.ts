import { IMapData } from '../components/map/map.interface';
import { IProgressInterface } from '../components/progress/progress.interface';
import { ISortListInterface } from '../components/sort-list/sort-list.interface';

export enum ReportTimeRangeType {WEEK = '周', MONTH = '月', YEAR = '年'};

export interface IReportData {
  title?: string,
  type?: 'carType' | 'carBrand',
  typeLabel?: '品牌' | '车型',
  platform?: string,
  reportDate?: {
    startDate?: string,
    endDate?: string,
    currentTime?: number
  },
  timeRangeType?: ReportTimeRangeType,
  days?: (number | string)[],
  startDate?: string,    // delete later
  endDate?: string,     // delete later
  brandName?: string,
  currentTime?: number
}

/**
* 物流数据结构
*/
export interface IdelayBeginCouncils{
  councilsName: string,
  totalNum: number,
  delayBeginRate: number,
  delayBeginCount: number
}

export interface IdelayEndCouncils{
  councilsName: string,
  totalNum: number,
  delayEndRate: number,
  delayEndCount: number
}

export interface IabMileageCouncils {
  councilsName: string,
  totalNum: number,
  abMileageRate: number,
  abMileageCount: number
}

export interface IdoubtDistCouncils{
  councilsName: string,
  totalNum: number,
  doubtDistRate: number,
  doubtDistCount: number
}
// 1
export interface IbrandGrade{
  brandGrade: number,
  brandName: string
}
// 2
export interface IorgGrade{
  orgGrade: number,
  orgName: string
}
// 3
export interface IcouncilsGrade{
  councilsGrade: number,
  councilsName: string
}
// 4
export interface IdriverGrade{
  driverId: number,
  receiptNum: number,
  driverGrade: number,
  driverName: string
}

export interface ILogisticReportData extends IReportData {
  transportResources: {
    driverNum: number[],
    logDepartmentNum: number[],
    placepointNum: number[],
    transportRouteNum: number[],
    councilsNum: number[],
    companyBranchNum: number[],
  },
  transportSituation: {
    weekBeforeTransportSituation: {
      allOrder: number,
      ontimeEndRate: string,
      ontimeBeginRate: string
    }
    lastWeekTransportSituation: {
      allOrder: number,
      waitScheNum: number,
      abnormalNum: number,
      ontimeEndRate: string,
      ontimeBeginRate: string,
      onroadNum: number,
      arriveNum: number
    }
  },
  abnormalTransportation: {
    delayBeginCount: any[],
    delayBeginCouncilsRank: IdelayBeginCouncils[],
    delayEndCount: any[],
    delayEndCouncilsRank: IdelayEndCouncils[],
    abMileageCount: any[],
    abMileageCouncilsRank: IabMileageCouncils[],
    doubtDistCount: any[],
    doubtDistCouncilsRank: IdoubtDistCouncils[]
  },
  transportationQualityEvaluation: {
    brandGradeTop: IbrandGrade[],
    brandGradeLast: IbrandGrade[],
    orgGradeTop: IorgGrade[],
    orgGradeLast: IorgGrade[],
    councilsGradeTop: IcouncilsGrade[],
    councilsGradeLast: IcouncilsGrade[],
    driverGradeTop: IdriverGrade[],
    driverGradeLast: IdriverGrade[]
  }
}

/**
* 销售数据结构
*/
export interface ISellReportData extends IReportData {
  carSalesJson?: {    // 车辆销售数据
    mapList: {}[],
    totalNum: number,
    [x: string]: any
  },
  totalSales?: number,
  saleRankJson?: {    // 各品牌车辆库存占比
    mapList?: {[x: string]: any}[]
  },
  stockCountJson?: {    // 库存分布
    mapList?: {
      province: string,
      value: number
    }[],
    total?: number
  },
  stockRankJson: {  // 各品牌库存占比
    mapList?: {
      brandOrType: string,
      value: number
    }[],
    total: number
  },
  noSaleJson: {
    mapList?: {[x: string]: any}[]
  },
  realSaleJson: {
    mapList?: {[x: string]: any}[]
  },
  noSaleInfoJson: {
    mapList?: {[x: string]: any}[]
  },
  realSaleInfoJson: {
    mapList?: {[x: string]: any}[]
  }
}

/**
 * 服务数据结构
 */
export interface IServeReportData extends IReportData {
  optionWeekInboundInfo: {
    totalJson: {
      inFenceCount: number,
      vehicleCount: number,
      avgInFenceTime: number
    },
    brandJSONArray: {
      avgInFenceTime: number,
      brandName: string,
      inFenceCount: number,
      vehicleCount: number
    }[],
  },
  optionWeekTruthInfo: {
    truthInfo: {
      totalNum: number,
      realNum: number,
      notRealNum: number
    },
    truthInfoByBrand: {[x: string]: any}[],
  },
  loadWeekTroubleshooting: {
    troubleshooting: {
      totalpushed: number,
      unprocessed: number,
      assigne: number,
      processed: number
    }
  }
}

/**
 * 质量报告数据结构
 */
export interface IFaultPercentByLevelAndTypeItem {
  name: string,
  data: number[]
}
export interface IFaultCountItem {
  codecount: number,
  code: string,
  source: string,
  source_name: string,
  name: string,
  description: string,
  spn: string,
  fmi: string,
  priority: string,
  provider: string,
  suggest: string,
  supplierCompanyName: string
}
export interface IFaultTopOneByTypeItem {
  car_brand_name: string,
  code: string,
  fmi: string,
  description: string,
  source: string,
  total: number,
  provider: string,
  source_name: string,
  max: number,
  suggest: string,
  priority: string,
  spn: string,
  name: string,
  supplierCompanyName: string
}
export interface IFaultPercentByTypeItem {
  car_brand_name: string,
  faultcars: any,
  times: string[],
  percents?: number[]
}
export interface IFaultRateCountJsonItem {
  name: string,
  code?: string,
  num: number,
  mileage?: number,
  work_time?: number,
  location_points?: number,
  can_points?: number,
  charge_power?: number,
  charge_count?: number,
  uncharge_count?: number
}
export interface IQeReportData extends IReportData {
  faultProfileJson: {
    faultcount: number,
    carcount: number,
    faultpercar: number,
    runmileagecount: number,
    faultpermileage: number
  },
  faultTypeJson: {
    source_name: string,
    source: string,
    source_count: number
  }[],
  faultLevelJson: IFaultPercentByLevelAndTypeItem[],
  faultRateJson: IFaultPercentByTypeItem[],
  faultRateCountJson: IFaultRateCountJsonItem[],
  faultRankJson: IFaultCountItem[],
  faultRatioJson: IFaultTopOneByTypeItem[],
  faultTreatJson: {
    faultcode?: number,
    unprocessed: number,
    assigne: number,
    processed: number,
    pushed?: number,
    totalpushed: number
  }
}

/**
 * 用户使用大数据周报
 */
export interface IProductData extends IReportData {
  subscTemplateName: String,
  platformInfoWeek: {
    beforeWeekMap: any,
    lastWeekMap: any,
    desc: string
  },
  productRankingWeek: {
    list: {
      companyNum: number,
      productName: string
    }[],
    desc: string
  },
  visitStatisticsFactory: {
    lastCompanyVisitTotal: number,
    lastCompanyTotal: number,
    companyVisitList: any
  },
  visitStatisticsDealer: {
    lastCompanyVisitTotal: number,
    lastCompanyTotal: number,
    companyVisitList: any
  },
  functionsUsedByFactory: {
    functionsUsedList: {
      compared: string,
      count: number,
      name: string
    }[]
  },
  functionsUsedByDealer: {
    functionsUsedList: {
      compared: string,
      count: number,
      name: string
    }[]
  },
  visitStatisticsProduct: {
    productVisitList: {
      compared: string,
      count: number,
      name: string
    }[]
  },
  visitStatisticsWeek: {
    beforeLastWeekVisit: any,
    lastWeekVisit: any
  }
};

/**
 * 用户行为大数据周报(车厂端)
 */
export interface IUserBehaviorData extends IReportData {
  subscTemplateName: String,
  platformInfoWeek: {
    lastMap: {
      activeNum: number,
			newNum: number,
			allNum: number
    }
  },
  userVisitCount: {
    userVisitList: {compared: string, count: number, name: string}[]
  },
  functionsUsedByFactory: {
    functionsUsedList: {
      compared: string,
      count: number,
      name: string
    }[]
  },
  visitStatisticsWeek: {
    beforeLastWeekVisit: any,
    lastWeekVisit: any,
    maxDay: string,
    lastTotal: number,
    maxCount: number,
    beforeLastTotal: number
  },
  functionsUsedByCompanyId: {
    functionsUsedList: {compared: string, count: number, name: string}[],
  }
};

/**
 * 车厂端报告
 */
export interface IRunInfo {
  carCount: number,
  totalMileage: number,
  totalRunTime: number,
  runDay: string
}
export interface IWorkRate {
  totalWorkDays: number,
  carCount: number,
  runDay: string
}
export interface ITerminalData extends IReportData {
  vehicleHotDistribution: {province: string, carCount: number }[],
  carRunAvgCount: {
    runInfoByCarType: {runInfo: IRunInfo[], carTypeName: string}[],
    runRateByCarType: {workRate: IWorkRate[], carTypeName: string}[]
  },
  iovInstallCount: {
    lastIncreasedNum: number,
    iovInstallByCarType: {vehicleNum: number, carTypeName: string}[],
    carTotalNum: number,
    beforeLastIncreasedNum: number,
    addRate: number
  },
  vehicleRunCount:{
    averageFuelConsumption: number,
    averageOilContent: number,
    averageVelocity: number
  },
  vehicleOnlineCount:{
    avgOnlineRate: number,
    tswkOnlineCount: number,
    onlineSummaryByCarType: {onLineRate: number, onLineCount: number, totalCount: number, carTypeName: string}[],
    totalCarCount: number
  },
  vehicleRunCountByCarType: {
    alarmNum: number,
    carNum: number,
    locationNum: number,
    runTime: number,
    mileAge: number,
    canNum: number
  },
  carLifecycleCount: {},
}

/**
 * 旧报告接口
 */
export interface IoldReportData extends IReportData{
  currentTime: number,
  carAvgMileageReport: {
    seriesData: number[],
    yAxisData: string[]
  },
  brandName: string,
  brands: { code: string, name: string }[],
  carTypes: { code: string, name: string }[],
  carOperateAvgReport: {
    avgUnChargePowerData: { date: string, code: string, numerator: number, denominator: number }[],
    avgWorkTimeData: { date: string, code: string, numerator: number, denominator: number }[],
    avgWorkRateData: { date: string, code: string, numerator: number, denominator: number }[],
    avgMileageData: { date: string, code: string, numerator: number, denominator: number }[]
  },
  carLongReport: {
    seriesData: number[],
    yAxisData: string[]
  },
  carAvgSpeedReport: {
    seriesData: number[],
    yAxisData: string[]
  },
  carAttendanceReport: {
    seriesData: number[],
    yAxisData: string[]
  },
  optionCarBrandAddAndRunInfo: {
    markPointAddData: {xAxis: string, yAxis: number}[],
    Q3AddData: { onLineRate: number, code: string, iCarNum: number, onLine: number }[],
    xAxisAddAndRunData: string[],
    onlineData: { carOnlineNum: number, carOnlineRate: number },
    seriesAddData: number[]
  },
  optionWeek6AddInfo: {
    section: string[],
    totalJson: {
      markPointData: {code: string, value: number}[],
      carTotalNum: number,
      addCarNum1: number,
      addCarNum2: number,
      addRate: number,
      xData: string[],
      sendTime: string
    }
  },
  optionCarBrandRunInfo: {
    seriesMileAgeData: number[],
    xAxisRunInfoData: string[],
    markPointMileageData: { xAxis: string, yAxis: number }[],
    seriesRunTimeData: number[],
    markPointRunTimeData: { xAxis: string, yAxis: number }[],
    totalJson: {
      chargeCount:number,
      chargePower: number,
      unchargeCount: number,
      LocationNum: number,
      CanNum: number,
      AlarmNum: number,
      carNum: number,
      runTime: number,
      mileAge: number
    },
    OnlineData: {
      [x: string]: {
        code: string,
        carNum: number,
        runTime: number,
        mileAge: number
      }
    }[]
  }
};

export interface CT_Report {
  company: {},
  created: string,
  id: number,
  modified: string,
  modifiedTime: string,
  name: string,
  "new": boolean,
  note: string,
  path: string,
  rangeTitle: string,
  startDate: string,
  status: number,
  subscTemplate: {}
}
