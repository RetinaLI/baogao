import { Injectable } from '@angular/core';
import { AjaxService } from './ajax.service';
import { ILogisticReportData,
  ISellReportData,
  IServeReportData,
  IQeReportData,
  IProductData,
  ReportTimeRangeType,
  IReportData,
  IUserBehaviorData,
  ITerminalData,
  IoldReportData} from './data.interface';

export type TReportData = IReportData | ITerminalData | IUserBehaviorData | ILogisticReportData | ISellReportData | IServeReportData | IQeReportData | IProductData;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataObj: IoldReportData;
  reportData: TReportData;

  private apiUrl: string = '';

  chinaJson: {
    [x: string]: any
  } = {};

  constructor(private ajaxService: AjaxService) {
    let search = document.location.search;
    if(!search || search.length === 0) return;
    let dataSearch = search.replace('?', '').split('&').find(e => e.indexOf('data=') === 0);
    dataSearch = dataSearch.substr(dataSearch.indexOf('=') + 1);
    this.apiUrl = decodeURIComponent(dataSearch);
    // console.info(this.apiUrl);
  }

  /**
   * 报告数据预处理
   */
  renderReportData() {
    let days = [];

    if(this.reportData.reportDate && this.reportData.reportDate.startDate &&  this.reportData.reportDate.endDate) {
      this.reportData.startDate = this.reportData.reportDate.startDate;
      this.reportData.endDate = this.reportData.reportDate.endDate;
    }

    this.reportData.typeLabel = this.reportData.type === 'carBrand' ? '品牌' : '车型';

    let startTime = new Date(FOTON_GLOBAL.Date.getDateByFormat(this.reportData.startDate)).getTime();
    let endTime = new Date(FOTON_GLOBAL.Date.getDateByFormat(this.reportData.endDate)).getTime();

    this.reportData.startDate = FOTON_GLOBAL.Date.getDateByFormat(this.reportData.startDate, 'yyyy.MM.dd');
    this.reportData.endDate = FOTON_GLOBAL.Date.getDateByFormat(this.reportData.endDate, 'yyyy.MM.dd');
    this.reportData.timeRangeType = endTime - startTime > 7 * 24 * 60 * 60000 ? ReportTimeRangeType.MONTH : ReportTimeRangeType.WEEK;

    if (this.reportData.timeRangeType === ReportTimeRangeType.MONTH) {
      let endDay = +FOTON_GLOBAL.Date.getDateByFormat(endTime, 'dd');
      days = '1'.repeat(endDay).split('').map((e, i) => i + 1);
    } else {
      days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    }
    this.reportData.days = days;

  }

  async getReportData(params?: any) {
    if (!this.apiUrl || this.reportData) return;
    let result = await this.ajaxService.get(this.apiUrl, params);

    if (!result || result.success === false) {
      return;
    }

    this.reportData = result as TReportData;
    this.renderReportData();
  }

  async getChinaJson() {
    let result = await this.ajaxService.get('assets/json/china.json', null);
    this.chinaJson = result;
  }

  async getOldReportData(params?: any) {
    if (!this.apiUrl || this.dataObj) return;
    let result = await this.ajaxService.get(this.apiUrl, params);

    if (!result || result.success === false) {
      return;
    }

    this.dataObj = result as IoldReportData;

  }
}
