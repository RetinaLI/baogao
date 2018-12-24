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
export interface ILogisticReportData extends IReportData {
  transportCondition: IMapData[],
  noStartShip3: ISortListInterface[],
  progressData: IProgressInterface[],
  brandPoor: string[],
  logisticPoor3: string[],
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
    delayBeginCouncilsRank: [
      {
        councilsName: string,
        totalNum: number,
        delayBeginRate: number,
        delayBeginCount: number
      }
    ],
    delayEndCount: any[],
    delayEndCouncilsRank: [
      {
        councilsName: string,
        totalNum: number,
        delayEndRate: number,
        delayEndCount: number
      }
    ],
    abMileageCount: any[],
    abMileageCouncilsRank: [
      {
        councilsName: string,
        totalNum: number,
        abMileageRate: number,
        abMileageCount: number
      }
    ],
    doubtDistCount: any[],
    doubtDistCouncilsRank: [
      {
        councilsName: string,
        totalNum: number,
        doubtDistRate: number,
        doubtDistCount: number
      }
    ]
  },
  transportationQualityEvaluation: {
    brandGradeTop: [{
      brandGrade: number,
      brandName: string
    }],
    brandGradeLast: [{
      brandGrade: number,
      brandName: string
    }],
    orgGradeTop: [{
      orgGrade: number,
      orgName: string
    }],
    orgGradeLast: [{
      orgGrade: number,
      orgName: string
    }],
    councilsGradeTop: [{
      councilsGrade: number,
      councilsName: string
    }],
    councilsGradeLast:[{
      councilsGrade: number,
      councilsName: string
    }],
    driverGradeTop: [{
      driverGrade: number,
      driverName: string
    }],
    driverGradeLast: [{
      driverGrade: number,
      driverName: string
    }]
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
  faultcars: number[],
  times: string[],
  percents?: number[]
}
export interface IFaultRateCountJsonItem {
  name: string,
  code: string,
  num: number,
  mileage: number,
  work_time: number,
  location_points: number,
  can_points: number,
  charge_power: number,
  charge_count: number,
  uncharge_count: number
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
  platformInfoWeek: {
    beforeWeekMap: any,
    lastWeekMap: any,
    desc: string
  },
  productRankingWeek: {
    list: [
      {
        companyNum: number,
        productName: string
      }
    ],
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
    functionsUsedList: [
      {
        compared: string,
        count: number,
        name: string
      }
    ]
  },
  functionsUsedByDealer: {
    functionsUsedList: [
      {
        compared: string,
        count: number,
        name: string
      }
      ]
  },
  visitStatisticsProduct: {
    productVisitList: [
      {
        compared: string,
        count: number,
        name: string
      }
    ]
  },
  listSort: [{
    title: string,
    progress: string,
    lift: string
  }],
  dealerList: [{
    title: string,
    progress: string,
    lift: string
  }],
  dealerScale: [{
    value: number,
    name: string
  }],
  parkScale: [{
    value: number,
    name: string
  }],
  comPieData: [{
    value: number,
    title: string,
    num: number
  }],
  dealerPieData: [{
    value: number,
    title: string,
    num: number
  }],
  parkList: [{
    title: string,
    progress: string,
    lift: string
  }],
  sortTopList: [{
    title: string,
    progress: string,
    lift: string
  }],
  visitStatisticsWeek: {
    beforeLastWeekVisit: any,
    lastWeekVisit: any
  }
}
