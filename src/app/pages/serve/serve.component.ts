import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Title } from '@angular/platform-browser';
import { IAccountIfAddData } from '../../components/account-if-add/account-if-add.interface';
import { IPieData } from '../../components/pie/pie.interface';
import { ITopNavData } from '../../components/top-nav/top-nav.interface';
import { IImgTextSheetsData } from '../../components/img-text-sheets/img-text-sheets.interface';
import { IServeReportData } from '../../services/data.interface';

@Component({
  selector: 'app-serve',
  templateUrl: './serve.component.html',
  styleUrls: ['./serve.component.scss']
})
export class ServeComponent implements OnInit {
  isLeisa = false;
  reportData: IServeReportData;
  bannerInfo: ITopNavData = {
    endDate: '',
    startDate: '',
    title: `服务大数据报告`,
    platform: '福田车联网平台',
    currentTime: ''
  };
  summaryData: IAccountIfAddData[] = [{
    key: 'inFenceCount',
    name: '在站总次数(次)',
    numberVal: 0
  },{
    key: 'vehicleCount',
    name: '涉及车辆数(辆)',
    numberVal: 0
  },{
    key: 'avgInFenceTime',
    name: '平均在站时长(h)',
    numberVal: 0
  }];
  trueScale: IPieData[] = [];
  facticityList: IImgTextSheetsData[] = [{
    key: 'totalNum',
    img: require('../../../assets/images/serve/true-icon1.png'),
    title: "服务单总数",
    num: 0
  },
  {
    key: 'realNum',
    img: require('../../../assets/images/serve/true-icon2.png'),
    title: "真实服务单",
    num: 0
  },
  {
    key: 'notRealNum',
    img: require('../../../assets/images/serve/true-icon3.png'),
    title: "不真实服务单",
    num: 0
  },
  {
    key: 'otherServeNum',
    img: require('../../../assets/images/serve/true-icon4.png'),
    title: "无法判断服务单",
    num: 0
  }];

  activeList: IImgTextSheetsData[] = [{
    key: 'assigne',
    img: require('../../../assets/images/serve/active-icon1.png'),
    title: "已派单",
    num: 0
  },
  {
    key: 'processed',
    img: require('../../../assets/images/serve/active-icon2.png'),
    title: "处理完成",
    num: 0
  }];


  enterPart = {
    brandCarEnterTotal: []
  };
  truePart = {
    color: ['#3DE3A3', '#FFBC53', '#ADADAD'],
    trueInfo: {}
  };
  falsePart = {
    falseData: []
  };
  activePart = {
    activeInfo: {
      sendTotal: 0
    }
  }

  constructor(public dataService: DataService, private pageTitle: Title) {
    this.pageTitle.setTitle(this.bannerInfo.title);
  }

  async ngOnInit() {
    await this.dataService.getReportData();
    this.reportData = this.dataService.reportData as IServeReportData;
    if(!this.reportData) return;
    this.bindData();
  }

  bindData() {
    let dateFormate = FOTON_GLOBAL.Date.getDateByFormat;

    this.bannerInfo.endDate = this.reportData.endDate;
    this.bannerInfo.startDate = this.reportData.startDate;
    this.bannerInfo.title = `服务大数据报告`;
    this.bannerInfo.platform = this.reportData.platform || '福田车联网平台';
    this.bannerInfo.currentTime = dateFormate(this.reportData.currentTime, 'yyyy.MM.dd HH:mm:ss'),
    this.pageTitle.setTitle(this.bannerInfo.title);
    if (this.bannerInfo.platform.indexOf('雷萨') > -1) {
      this.isLeisa = true;
    } else{
      this.isLeisa = false;
    }

    //进站统计
    this.summaryData = this.summaryData.map(dataElem => {
      return Object.assign(dataElem, {
        numberVal: this.reportData.optionWeekInboundInfo.totalJson[dataElem.key]
      });
    });

    if (this.reportData.type === "carBrand") {
      let orderBrandTotal = ['欧曼', '欧马可', '奥铃', '时代', '瑞沃', '风景']
      let elseBrand = [];
      orderBrandTotal.map((value, index) => {
        this.reportData.optionWeekInboundInfo.brandJSONArray.map((item, key) => {
          if(item.brandName === value) {
            this.enterPart.brandCarEnterTotal.push(item)
          }
        })
      })
      let vehicleCount = 0, inFenceCount = 0, hoursTotle = 0;
      let arr = [];
      this.reportData.optionWeekInboundInfo.brandJSONArray.map((item, key) => {
        if(orderBrandTotal.indexOf(item.brandName) == -1) {
          arr.push(item)
          inFenceCount += item.inFenceCount;
          vehicleCount += item.vehicleCount;
          hoursTotle += item.avgInFenceTime * item.vehicleCount
        }
      })
      elseBrand.push({
        brandName: '其他',
        inFenceCount: inFenceCount,
        vehicleCount: vehicleCount,
        avgInFenceTime: (hoursTotle/vehicleCount).toFixed(2)
      })
      this.enterPart.brandCarEnterTotal = this.enterPart.brandCarEnterTotal.concat(elseBrand)
    } else if (this.reportData.type === "carType") {
      let dataMap = this.reportData.optionWeekInboundInfo.brandJSONArray.sort((a,b) => {return a.avgInFenceTime - b.avgInFenceTime});
      let indexInvalid;
      dataMap.forEach((val, index) => {
        if (Object.keys(val).length === 3) {
          indexInvalid = index;
        };
      });
      dataMap.splice(indexInvalid, 1);
      this.enterPart.brandCarEnterTotal = dataMap;
    }

    //服务真实性
    let otherServeNum = this.reportData.optionWeekTruthInfo.truthInfo.totalNum - this.reportData.optionWeekTruthInfo.truthInfo.realNum - this.reportData.optionWeekTruthInfo.truthInfo.notRealNum;

    let trueScale = [];
    trueScale.push(
      {name: "真实", value: this.reportData.optionWeekTruthInfo.truthInfo.realNum},
      {name: "不真实", value: this.reportData.optionWeekTruthInfo.truthInfo.notRealNum},
      {name: "无法判断", value: otherServeNum}
    )
    this.trueScale = trueScale;
    this.facticityList = this.facticityList.map((dataElem, i) => {
      return Object.assign(dataElem, {
        num: i === 3 ? otherServeNum : this.reportData.optionWeekTruthInfo.truthInfo[dataElem.key]
      });
    });

    let falsePartObj =[];
    if (this.reportData.type === "carBrand") {
      let orderFalseData = ['欧曼', '欧马可', '奥铃', '时代', '瑞沃'];
      orderFalseData.map((value, index) => {
        this.reportData.optionWeekTruthInfo.truthInfoByBrand.map((item, key) => {
          if(item.brandName === value) {
            falsePartObj.push({
              title: item.brandName,
              progress: item.brandNotRealNum/item.brandTotalNum*100
            })
          }
        })
        this.falsePart.falseData = falsePartObj;
      });
    } else if (this.reportData.type === "carType")  {
      this.reportData.optionWeekTruthInfo.truthInfoByBrand.map((item, key) => {
        falsePartObj.push({
          title: item.brandName,
          progress: item.brandNotRealNum/item.brandTotalNum*100
        })
      })
      this.falsePart.falseData = falsePartObj;
    };

    //主动服务
    this.activePart.activeInfo.sendTotal = this.reportData.loadWeekTroubleshooting.troubleshooting.totalpushed

    this.activeList = this.activeList.map(dataElem => {
      return Object.assign(dataElem, {
        num: this.reportData.loadWeekTroubleshooting.troubleshooting[dataElem.key]
      });
    });

  }
}
