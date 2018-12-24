import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {IQeReportData, IFaultPercentByLevelAndTypeItem} from '../../services/data.interface';
import {ITopNavData} from '../../components/top-nav/top-nav.interface';
import {IAccountIfAddData} from '../../components/account-if-add/account-if-add.interface';
import {IPieData} from '../../components/pie/pie.interface';
import {IProgressInterface} from '../../components/progress/progress.interface';
import {IImgTextSheetsData} from '../../components/img-text-sheets/img-text-sheets.interface';
import {Title} from '@angular/platform-browser';
import {formatNumber} from '@angular/common';

interface IViewFaultPercentByType {
  highSize: number,
  middleSize: number,
  lowSize: number,
  highSizeColor: string,
  middleSizeColor: string,
  lowSizeColor: string
};

@Component({
  selector: 'app-qe',
  templateUrl: './qe.component.html',
  styleUrls: ['./qe.component.scss']
})
export class QeComponent implements OnInit {
  reportData: IQeReportData;
  bannerInfo: ITopNavData = {
    className: 'qe',
    endDate: '',
    startDate: '',
    title: `质量大数据报告`,
    platform: '福田车联网平台',
    currentTime: ''
  };
  summaryData: IAccountIfAddData[] = [{
    valueKey: 'faultcount',
    name: '故障总数（次）',
    numberVal: 0
  }, {
    valueKey: 'carcount',
    name: '故障车辆(台)',
    numberVal: 0
  }, {
    valueKey: 'faultpercar',
    name: '台均故障(次)',
    numberVal: 0
  }, {
    valueKey: 'runmileagecount',
    name: '行驶总里程(公里)',
    numberVal: 0
  }, {
    valueKey: 'faultpermileage',
    name: '千公里故障(次)',
    numberVal: 0
  }];
  orderByFaultTypeData: IPieData[] = [];
  orderByFaultTypeList: {
    name: string,
    color: string,
    value: number
  }[] = [];
  orderByFaultTypeChartColors: string[] = ['#4475FD', '#3DE3A3', '#FFBC53', '#FFD94F', '#F27819', '#ED668C', '#9366ED', '#66BEED', '#2D19B9', '#C50F4B'];
  orderByFaultTypeChartGrid = {
    top: 0,
    bottom: 0
  };
  faultByBrandList: IViewFaultPercentByType[] = [];
  faultByBrandColors: {
    label: string,
    color: string
  }[] = [
    {label: '高', color: '#FFBC53'},
    {label: '中', color: '#4475FD'},
    {label: '低', color: '#3DE3A3'},
  ];

  faultCountList: IProgressInterface[] = [];

  faultFixList: IImgTextSheetsData[] = [{
    valueKey: 'faultcount',
    title: '推送总数',
    img: require('../../../assets/images/quality/icon-all@2x.png'),
    num: 0
  }, {
    valueKey: 'unprocessed',
    title: '待处理',
    img: require('../../../assets/images/quality/icon-pending@2x.png'),
    num: 0
  }, {
    valueKey: 'assigne',
    title: '已分发',
    img: require('../../../assets/images/quality/icon-allot@2x.png'),
    num: 0
  }, {
    valueKey: 'processed',
    title: '处理完成',
    img: require('../../../assets/images/quality/icon-done@2x.png'),
    num: 0
  }];

  faultTopOneByTypeList: IProgressInterface[] = [];

  faultPercentByTypeOption: any;

  constructor(public dataService: DataService, private pageTitle: Title) {
    this.pageTitle.setTitle(this.bannerInfo.title);
  }

  bindData() {
    let dateFormate = FOTON_GLOBAL.Date.getDateByFormat;

    this.bannerInfo.endDate = this.reportData.endDate;
    this.bannerInfo.startDate = this.reportData.startDate;
    this.bannerInfo.title = `质量大数据报告`;
    this.bannerInfo.currentTime = dateFormate(this.reportData.reportDate.currentTime, 'yyyy.MM.dd HH:mm:ss'),
    this.pageTitle.setTitle(this.bannerInfo.title);

    this.summaryData = this.summaryData.map(dataElem => {
      return Object.assign(dataElem, {
        numberVal: this.reportData.faultProfileJson[dataElem.valueKey]
      });
    });

    this.orderByFaultTypeData = this.sortDaultTypeJson(this.reportData.faultTypeJson);
    this.orderByFaultTypeList = this.orderByFaultTypeData.map((item, i) => {
      return {...item, color: this.orderByFaultTypeChartColors[i]};
    });

    this.faultByBrandList = this.reportData.faultLevelJson.reverse().map(item => {
      let sum = item.data.reduce((pre, next) => {
        return pre + next;
      });
      return Object.assign(item, {
        highSize: Number(this.formToFixed(item.data[0], sum)),
        middleSize: Number(this.formToFixed(item.data[1], sum)),
        lowSize: Number(this.formToFixed(item.data[2], sum)),
        highSizeColor: this.faultByBrandColors[0].color,
        middleSizeColor: this.faultByBrandColors[1].color,
        lowSizeColor: this.faultByBrandColors[2].color
      });
    });

    this.faultCountList = this.reportData.faultRankJson.map(item => {
      return {
        title: item.name || item.description,
        progress: item.codecount + ''
      };
    });

    this.faultFixList = this.faultFixList.map((faultItem, i) => {
      return Object.assign(faultItem, {
        num: i === 0 ? this.reportData.faultProfileJson[faultItem.valueKey] : this.reportData.faultTreatJson[faultItem.valueKey]
      })
    });

    this.faultTopOneByTypeList = this.reportData.faultRatioJson.reverse().map(item => {
      let count = 0;
      if (item.car_brand_name === '全部') {
        count = item.max / this.reportData.faultProfileJson.faultcount * 1000;
      } else {
        count = item.max / item.total * 1000;
      }
      return {
        title: item.car_brand_name,
        progress: (Math.round(count) / 10).toFixed(1),
        problem: item.name || item.description
      };
    });
    this.bindFaultPercentByTypeList();

  }

  async ngOnInit() {
    await this.dataService.getReportData();
    this.reportData = this.dataService.reportData as IQeReportData;
    if (!this.reportData) return;
    this.bindData();
  }

  // 故障类型占比排名
  sortDaultTypeJson(data) {
    if (data) {
      let arr = [];
      let ruds = 0;
      let sum = data.filter(ele => {
        return ele.source_name;
      }).map(item => item.source_count).reduce(function (preValue, curValue) {
        return preValue + curValue;
      });
      data.filter(ele => {
        return ele.source_name;
      }).sort((a, b) => {
        return b.source_count - a.source_count;
      }).map(ele => {
        let count = this.formToFixed(ele.source_count, sum);
        ruds += Number(count) * 10;
        arr.push({
          name: ele.source_name,
          value: count
        });
      });

      arr[0].value = (Number(arr[0].value) + (1000 - ruds) / 10).toFixed(1) + '';
      return arr;
    }
  }

  formToFixed(num, sum) {
    return (Math.round((num / sum) * 1000) / 10).toFixed(1);
  }

  bindFaultPercentByTypeList() {
    let colors = ['#666666', '#4475FD', '#3DE3A3', '#FFBC53', '#F56C6C', '#FFD94F'];
    let faultPercentByTypeList = this.reportData.faultRateJson.reverse();
    faultPercentByTypeList = faultPercentByTypeList.map(ele => {
      let oneCount = 0;
      let percents = [];
      if (ele.car_brand_name === '全部') {
        oneCount = this.reportData.faultRateCountJson.map(ele => ele.num).reduce(function (preValue, curValue) {
          return preValue + curValue;
        });
      } else {
        oneCount = this.reportData.faultRateCountJson.find(fele => fele.name === ele.car_brand_name).num;
      }
      if (oneCount) {
        percents = ele.faultcars.map(item => parseFloat((Math.round(item / oneCount * 1000) / 10).toFixed(1)));
      }
      return Object.assign(ele, {
        percents
      });
    });
    let faultPercentByTypeOption = {
      color: colors,
      tooltip: {
        trigger: 'axis',
        // formatter: "{a} <br/>{b} : {c}"
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: faultPercentByTypeList.map(item => {
          return item.car_brand_name;
        }),
        bottom: 0,
        left: 'center',
        textStyle: {
          color: '#aaa',
          fontSize: 12
        },
        icon: 'circle',
        itemHeight: 6,
        itemWidth: 8
      },
      grid: {
        top: 20
      },
      yAxis: [
        {
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(102, 102, 102, .2)'
            }
          },
          axisLabel: {
            formatter: '{value}%',
            color: 'rgba(51, 51, 51, .4)'
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(102, 102, 102, .1)'
            }
          }
        }
      ],
      xAxis: [{
        boundaryGap: false,
        data: this.reportData.days,
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(102, 102, 102, .2)'
          }
        },
        axisLabel: {
          color: 'rgba(51, 51, 51, .4)'
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(102, 102, 102, .1)'
          }
        }
      }],
      series: []
    };
    faultPercentByTypeOption.series = faultPercentByTypeList.map((item, i) => {
      return Object.assign({
        name: item.car_brand_name,
        type: 'line',
        data: item.percents,
        lineStyle: {
          color: colors[i],
          type: i === 0 ? 'dotted' : 'solid'
        },
        itemStyle: {
          opacity: 0
        }
      }, i === 0 ? {
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0.3,
              color: '#AAAAAA'
            }, {
              offset: 1,
              color: '#FFFFFF'
            }])
          }
        },
      } : {});
    });
    this.faultPercentByTypeOption = faultPercentByTypeOption;
  }

  trackByOrderByFaultTypeList(index: number, data: IPieData): number {
    return index;
  }

  trackByFaultByBrandList(index: number, data: IFaultPercentByLevelAndTypeItem): string {
    return data.name;
  }

  trackByFaultByBrandColors(index: number, data: any): number {
    return index;
  }

}
