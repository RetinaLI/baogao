import {Component, OnInit} from '@angular/core';

import {DataService} from '../../services/data.service';
import {ITopNavData} from '../../components/top-nav/top-nav.interface';
import {IProductData, IQeReportData} from '../../services/data.interface';
import {IAccountIfAddData} from '../../components/account-if-add/account-if-add.interface';
import {IProgressInterface} from '../../components/progress/progress.interface';
import {ISortInterface} from '../../components/sort/sort.interface';
import {ISortListInterface} from '../../components/sort-list/sort-list.interface';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  reportData: IProductData;
  bannerInfo: ITopNavData = {
    endDate: '',
    startDate: '',
    title: `用户使用大数据报告`,
    platform: '福田车联网平台',
    currentTime: ''
  };
  accountIfAdd: IAccountIfAddData[] = [{
    number: [0, 0],
    name: '',
    addValue: ''
  }, {
    number: [0, 0],
    name: '',
    addValue: ''
  }];
  sortList: IProgressInterface[] = [];
  visitList: IProgressInterface[] = [];
  sortTopList: ISortInterface[] = [];
  listSort: ISortListInterface[] = [];
  parkList: ISortListInterface[] = [];
  dealerList: ISortListInterface[] = [];
  dealerScale: any = [{
    value: 0,
    name: ''
  }];
  parkScale: any = [{
    value: 0,
    name: ''
  }];
  visitOption: any;
  chartSum: any = {};
  comPieData: any;
  dealerPieData: any;
  lifts: string[] = ['2', '1', '0'];
  dealerColor: string[] = ['#4475FD', '#3DE3A3', '#FFBC53', '#FFD94F', '#F56C6C', '#D5D5D5'];
  comPieColor: string[] = ['#4475FD', '#D5D5D5'];
  dealerPieColor: string[] = ['#FFBC53', '#D5D5D5'];

  detail: any = {
    text: '持平',
    result: 0
  };
  detailCom: any = {
    text: '持平',
    result: 0
  };

  constructor(private dataService: DataService, private pageTitle: Title) {
    this.pageTitle.setTitle(this.bannerInfo.title);
  }

  async ngOnInit() {
    await this.dataService.getReportData();
    this.reportData = this.dataService.reportData as IProductData;
    if (!this.reportData) return;
    let dateFormate = FOTON_GLOBAL.Date.getDateByFormat;

    let {
      title,
      platform,
      startDate,
      endDate,
      currentTime,
      platformInfoWeek,
      productRankingWeek,
      visitStatisticsProduct,
      visitStatisticsFactory,
      visitStatisticsDealer,
      functionsUsedByFactory,
      visitStatisticsWeek,
      functionsUsedByDealer,
      days
    } = this.reportData as IProductData;
    title = `用户使用大数据报告`;
    platform = '福田车联网平台';
    this.bannerInfo = {title, platform, startDate, endDate};
    this.bannerInfo.currentTime = dateFormate(currentTime, 'yyyy.MM.dd HH:mm:ss'),
    this.pageTitle.setTitle(title);
    let titleList = [
      {
        title: '产品总数(个)',
        key: 'productNum'
      }, {
        title: '开通企业总数(个)',
        key: 'companyNum'
      }, {
        title: '账号总数(个)',
        key: 'userNum'
      }];
    this.accountIfAdd = titleList.map((ele, i) => {
      return {
        name: ele.title,
        number: [
          platformInfoWeek.lastWeekMap[ele.key],
          platformInfoWeek.lastWeekMap[ele.key] - platformInfoWeek.beforeWeekMap[ele.key]
        ]
      };
    });
    this.detail = this.getDetailIndex(this.accountIfAdd[0]);
    this.detailCom = this.getDetailIndex(this.accountIfAdd[1], true);
    this.sortList = productRankingWeek.list.sort((a, b) => {
      return b.companyNum - a.companyNum;
    }).splice(0, 10).map(ele => {
      return {
        title: ele.productName,
        progress: ele.companyNum + ''
      };
    });
    this.visitList = visitStatisticsProduct.productVisitList.sort((a, b) => {
      return b.count - a.count;
    }).splice(0, 10).map(ele => {
      return {
        title: ele.name,
        lift: this.lifts[Number(ele.compared) + 1],
        progress: ele.count + ''
      };
    });
    this.sortTopList = visitStatisticsFactory.companyVisitList.sort((a, b) => {
      return b.count - a.count;
    }).splice(0, 3).map(ele => {
      return {
        title: ele.name,
        progress: ele.count + '',
        lift: this.lifts[Number(ele.compared) + 1]
      };
    });
    this.listSort = visitStatisticsDealer.companyVisitList.sort((a, b) => {
      return b.count - a.count;
    }).splice(0, 5).map(ele => {
      return {
        title: ele.name,
        progress: ele.count + '',
        lift: this.lifts[Number(ele.compared) + 1]
      };
    });

    let functionsUsedByFactoryData = this.getPark(functionsUsedByFactory);
    let functionsUsedByDealerData = this.getPark(functionsUsedByDealer);
    this.parkList = functionsUsedByFactoryData.lists;
    this.parkScale = functionsUsedByFactoryData.scales;
    // console.log(this.parkScale);
    // console.log(this.parkList);
    this.dealerList = functionsUsedByDealerData.lists;
    this.dealerScale = functionsUsedByDealerData.scales;
    // 渲染折线图
    let visitChartData = [
      {
        name: '本周',
        percents: Object.values(visitStatisticsWeek.lastWeekVisit)
      },
      {
        name: '上周',
        percents: Object.values(visitStatisticsWeek.beforeLastWeekVisit)
      }
    ];
    this.bindChartList(visitChartData, days);
    this.chartSum = this.getChartSum(visitChartData, Object.keys(visitStatisticsWeek.lastWeekVisit));
    // 百分比
    let visitNum = parseFloat((Math.round(visitStatisticsFactory.lastCompanyVisitTotal / visitStatisticsFactory.lastCompanyTotal * 1000) / 10).toFixed(1));
    // let dealerNum = parseInt(().toFixed(1));
    let nums = Math.round(visitStatisticsDealer.lastCompanyVisitTotal / visitStatisticsDealer.lastCompanyTotal * 1000) / 10;
    let dealerNum = parseFloat((nums).toFixed(1));
    this.comPieData = [{
      name: '车厂端使用率',
      value: visitNum,
      num: visitStatisticsFactory.lastCompanyVisitTotal
    }, {
      name: '车厂端未使用率',
      value: 100 - visitNum,
      num:visitStatisticsFactory.lastCompanyTotal - visitStatisticsFactory.lastCompanyVisitTotal
    }];

    this.dealerPieData = [{
      name: '经销商端使用率',
      value: dealerNum,
      num: visitStatisticsDealer.lastCompanyVisitTotal
    }, {
      name: '经销商端未使用率',
      value: 100 - dealerNum,
      num: visitStatisticsDealer.lastCompanyTotal - visitStatisticsDealer.lastCompanyVisitTotal
    }];
  }

  getPark(dataName) {
    let sumPark = dataName.functionsUsedList.map(item => item.count).reduce(function (preValue, curValue) {
      return preValue + curValue;
    });
    let fiveParkList = [];
    // 饼图5个
    let fivePark = dataName.functionsUsedList.sort((a, b) => {
      return b.count - a.count;
    }).splice(0, 10).map(ele => {
      fiveParkList.push({
        title: ele.name,
        progress: ele.count,
        lift: this.lifts[Number(ele.compared) + 1]
      });
      return {
        name: ele.name,
        value: parseFloat((ele.count / sumPark * 100).toFixed(1)),
      };
    });

    // 列表10个

    let lists = fiveParkList;
    let scales = fivePark.slice(0,5).concat([
      {
        name: '其他',
        value: 100 - fivePark.map(item => item.value).reduce(function (preValue, curValue) {
          return preValue + curValue;
        })
      }
    ]);
    return {
      lists,
      scales
    };
  }

  getChartSum(data, startDate) {
    let week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    let sum = data[0].percents.reduce((prve, next) => {
      return prve + next;
    });
    let sumLast = data[1].percents.reduce((prve, next) => {
      return prve + next;
    });
    let sumLastNum = 0;
    if (sumLast === 0) {
      sumLastNum = sum;
    } else {
      sumLastNum = sumLast;
    }
    let per = (sum - sumLast) / sumLastNum * 100;
    let maxNum = Math.max(...data[0].percents);
    let maxIndex = data[0].percents.indexOf(maxNum);
    let dates = startDate[maxIndex].split('-');
    return {
      sum,
      per,
      maxNum,
      week: week[maxIndex],
      date: `${dates[0]}年${dates[1]}月${dates[2]}日`
    };
  }

  getDetailIndex(data, bool = false) {
    let index = 2;
    let detail = ['增长', '下降', '持平'];
    if (data.number[1] > 0) {
      index = 0;
    } else if (data.number[1] < 0) {
      index = 1;
    } else {
      if (bool) {
        index = 0;
      } else {
        index = 2;
      }
    }
    return {
      text: detail[index],
      result: Math.abs(data.number[1])
    };
  }

  bindChartList(data, day) {
    let colors = ['#4475FD', '#FFBC53'];
    let faultPercentByTypeList = data;
    let faultPercentByTypeOption = {
      color: colors,
      tooltip: {
        trigger: 'axis',
        formatter: '{a} <br/>{b} : {c}'
      },
      legend: {
        data: faultPercentByTypeList.map(item => {
          return item.name;
        }),
        align: 'right',
        bottom: 0,
        right: 30,
        textStyle: {
          color: '#aaa',
          fontSize: 12
        },
        icon: 'react',
        itemHeight: 4,
        itemWidth: 22
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
            formatter: '{value}',
            color: 'rgba(51, 51, 51, .4)',
            // rotate: 30,
            margin: 1
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
        data: day,
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
      series: [
      ]
    };
    faultPercentByTypeOption.series = faultPercentByTypeList.map((item, i) => {
      return Object.assign({
        name: item.name,
        type: 'line',
        smooth: true,
        markPoint: {
          symbol: "image://assets/images/tip-arrow.png",
          symbolSize: [69, 37],
          symbolOffset: [0, "-70%"],
          // showSymbol: true,
          data: [
            {
              type: "average",
              name: "",
              label: {
                normal: {
                  color: "#53a2ff"
                }
              }
            }
          ],
          itemStyle: {
            normal: {
              borderColor: "transparent"
            }
          }
        },
        data: item.percents,
        // lineStyle: {
        //   color: colors[i],
        //   type: i === 0 ? 'dotted' : 'solid'
        // },
        itemStyle: {
          opacity: 0
        }
      }, i === 0 ? {
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0.1,
              color: 'rgba(86, 130, 254, .4)'
            }, {
              offset: 1,
              color: '#ffffff'
            }])
          }
        },
      } : {});
    });
    // console.info(faultPercentByTypeOption);
    this.visitOption = faultPercentByTypeOption;
  }
}
