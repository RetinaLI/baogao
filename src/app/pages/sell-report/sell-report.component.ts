import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Title } from '@angular/platform-browser';

import { IMapData } from '../../components/map/map.interface';
import { ITopNavData } from '../../components/top-nav/top-nav.interface';
import { ISellReportData } from '../../services/data.interface';


@Component({
  selector: 'app-sell-report',
  templateUrl: './sell-report.component.html',
  styleUrls: ['./sell-report.component.scss']
})
export class SellReportComponent implements OnInit {
  public reportData: any = null;
  public ObjectKeys = Object.keys;
  public bannerInfo: ITopNavData = {
    title: '销售大数据报告',
    platform:'福田车联网平台',
    startDate: '',
    endDate: '',
    currentTime: ''
  };
  public mapDataSell: IMapData[] = [
    {name: '', value: 0}
  ];
  public provinces31: IMapData[] = [
    {name: "山东", value: 0},
    {name: "河北", value: 0},
    {name: "河南", value: 0},
    {name: "江苏", value: 0},
    {name: "安徽", value: 0},
    {name: "西藏", value: 0},
    {name: "广东", value: 0},
    {name: "四川", value: 0},
    {name: "浙江", value: 0},
    {name: "山西", value: 0},
    {name: "内蒙古", value: 0},
    {name: "江西", value: 0},
    {name: "新疆", value: 0},
    {name: "天津", value: 0},
    {name: "福建", value: 0},
    {name: "青海", value: 0},
    {name: "陕西", value: 0},
    {name: "北京", value: 0},
    {name: "黑龙江", value: 0},
    {name: "湖南", value: 0},
    {name: "甘肃", value: 0},
    {name: "重庆", value: 0},
    {name: "海南", value: 0},
    {name: "宁夏", value: 0},
    {name: "云南", value: 0},
    {name: "辽宁", value: 0},
    {name: "贵州", value: 0},
    {name: "上海", value: 0},
    {name: "广西", value: 0},
    {name: "湖北", value: 0},
    {name: "吉林", value: 0}
  ];
  public provincesSecond: IMapData[] = [
    {name: "山东", value: 0},
    {name: "河北", value: 0},
    {name: "河南", value: 0},
    {name: "江苏", value: 0},
    {name: "安徽", value: 0},
    {name: "西藏", value: 0},
    {name: "广东", value: 0},
    {name: "四川", value: 0},
    {name: "浙江", value: 0},
    {name: "山西", value: 0},
    {name: "内蒙古", value: 0},
    {name: "江西", value: 0},
    {name: "新疆", value: 0},
    {name: "天津", value: 0},
    {name: "福建", value: 0},
    {name: "青海", value: 0},
    {name: "陕西", value: 0},
    {name: "北京", value: 0},
    {name: "黑龙江", value: 0},
    {name: "湖南", value: 0},
    {name: "甘肃", value: 0},
    {name: "重庆", value: 0},
    {name: "海南", value: 0},
    {name: "宁夏", value: 0},
    {name: "云南", value: 0},
    {name: "辽宁", value: 0},
    {name: "贵州", value: 0},
    {name: "上海", value: 0},
    {name: "广西", value: 0},
    {name: "湖北", value: 0},
    {name: "吉林", value: 0}
  ];
  public top10Height: string = '1.65rem';
  titleWidth: string = '.61rem';
  public mapDataRepertory: IMapData[] = [];
  public colors: string[] = ['#4475FD', '#3DE3A3', '#FFBC53', '#FFD94F', '#F56C6C'];
  public parts: {
    [x: string]: any
  } = {
    sell: {
      partNum: '01',
      partName: '车辆销售',
      detail: {
        total: 0,
        firstProvince: {
          name: '',
          value: 0
        }
      }
    },
    repertory: {
      partNum: '02',
      partName: '库存分布',
      detail: {
        total: 0,
        firstProvince: {
          name: '',
          value: 0
        },
        lastProvince: {
          name: '',
          value: 0
        }
      },
      // 各品牌库存占比
      brandRepertoryRatyData: []
    },
    realSell: {
      partNum: '03',
      partName: '实销情况',
      // 实销、库存的虚假占比
      realSellRepertoryRatyData: {
        sell: {
          real: 0,
          sham: 0,
          raty: 0
        },
        repertory: {
          real: 0,
          sham: 0,
          raty: 0
        }
      },
      // 各品牌车联网实销情况
      platformRealSell: [],
      maxNum: 0
    }
  }
  public brandSellProvinceOrder = [];

  constructor(public dataService: DataService, private pageTitle: Title) {
    this.pageTitle.setTitle(this.bannerInfo.title);
  }
  async ngOnInit() {
    await this.dataService.getReportData();
    let _DATEFormat = FOTON_GLOBAL.Date.getDateByFormat;
    let reportData = this.dataService.reportData as ISellReportData;

    if(!reportData) return;
    this.reportData = reportData;
    let {
      title,
      currentTime,
      platform,
      reportDate,
      saleRankJson,
      carSalesJson,
      stockCountJson,
      stockRankJson
    } = reportData as ISellReportData;
    // banner
    this.bannerInfo = {
      title: `销售大数据报告`,
      platform: reportData.platform,
      startDate: _DATEFormat(reportDate.startDate, 'yyyy.MM.dd'),
      endDate: _DATEFormat(reportDate.endDate, 'yyyy.MM.dd'),
      currentTime: _DATEFormat(currentTime, 'yyyy.MM.dd HH:mm:ss'),
    };
    this.pageTitle.setTitle(this.bannerInfo.title);

    // 车辆销售
    if(carSalesJson.mapList.length > 0) {
      let mapListConvert = this.convertArrJsonName(carSalesJson.mapList, 'province').sort((a, b) => b.value - a.value);
      mapListConvert = this.convertProvinceName(mapListConvert);
      if (mapListConvert && mapListConvert.length < 5) {
        this.top10Height = mapListConvert.length * .4 + 'rem';
      }
      this.provinces31.map((v, index) => {
        mapListConvert.forEach((item, id) => {
          if (v.name === item.name) {
            v.value = item.value;
          }
        });
      });
      mapListConvert = this.provinces31;
      this.mapDataSell = mapListConvert.sort((a, b) => b.value - a.value);
      this.parts.sell.detail.total = carSalesJson.totalNum;
      this.parts.sell.detail.firstProvince.name = mapListConvert[0].name;
      this.parts.sell.detail.firstProvince.value = mapListConvert[0].value;
      let brandOrder1;
      if (reportData.type === 'carBrand') {
        brandOrder1 = ['欧曼', '欧马可', '奥铃', '时代', '瑞沃', '雷萨'];
      } else if (reportData.type === 'carType') {
        let arr = [];
        saleRankJson.mapList.map((item) => {
          arr.push(item.brandOrType);
        })
        brandOrder1 = arr;
      }

      this.brandSellProvinceOrder = this.convertProvinceName(brandOrder1.map(v => {
        let obj = {
          name: '',
          provinces: []
        };

        let item = saleRankJson.mapList.filter(a => a.brandOrType === v)[0];
        if (item) {
          obj.name = v;
          if (item.provinceRank.length > 2) {
            obj.provinces = item.provinceRank.sort((a, b) => b.value - a.value).slice(0, 3);
          } else if ( item.provinceRank.length === 2) {
            obj.provinces = item.provinceRank.sort((a, b) => b.value - a.value);
            obj.provinces.push({"province": "无"})
          } else if ( item.provinceRank.length === 1) {
            obj.provinces = [{"province": item.provinceRank[0].province}];
            obj.provinces.push({"province": "无"});
            obj.provinces.push({"province": "无"});
          }
          return obj;
        } else {
          return null;
        }
      }).filter(v => v))
    }

    // 库存分布
    let arr = this.convertArrJsonName(stockCountJson.mapList, 'province').sort((a, b) => b.value - a.value);
    arr = this.convertProvinceName(arr);
    this.parts.repertory.detail.total = stockRankJson.total || 0;
    this.parts.repertory.detail.firstProvince = arr[0];
    this.parts.repertory.detail.lastProvince = arr[arr.length - 1];

    this.provincesSecond.map((v, index) => {
      arr.forEach((item, id) => {
        if (v.name === item.name) {
          v.value = item.value;
        }
      })
    });

    this.mapDataRepertory = this.provincesSecond.sort((a, b) => b.value - a.value);
    // chart data
    let brandOrder2 = ['欧曼', '欧马可', '奥铃', '瑞沃'];
    let covertData = this.convertArrJsonName(stockRankJson.mapList, 'brandOrType');
    if (reportData.type === 'carBrand') {
      let pieChartData = [];
      let othersObj = { name: '其他', value: 0};
      covertData.forEach(v => {
        if(brandOrder2.indexOf(v.name) > -1) {
          pieChartData.push(v);
        }else {
          othersObj.value += v.value;
        }
      });
      pieChartData.push(othersObj);   // 图标数据 完成
      this.parts.repertory.brandRepertoryRatyData = pieChartData;
    } else if(reportData.type === 'carType') {
      this.parts.repertory.brandRepertoryRatyData = covertData;
    }

     // 车联网实销情况
    this.parts.realSell.realSellRepertoryRatyData = {
      sell: {
        real: reportData.realSaleJson.mapList[0].totalNum,
        sham: reportData.realSaleJson.mapList[0].actualSalesNum,
        raty: (reportData.realSaleJson.mapList[0].actualSalesNum / reportData.realSaleJson.mapList[0].totalNum)
        // weekAddActualNum: reportData.realSaleJson.mapList[2].weekAddActualNum,
        // weekAddTotalNum: reportData.realSaleJson.mapList[2].weekAddTotalNum
      },
      repertory: {
        real: reportData.noSaleJson.mapList[0].totalNum,
        sham: reportData.noSaleJson.mapList[0].actualSalesNum,
        raty: (reportData.noSaleJson.mapList[0].actualSalesNum / reportData.noSaleJson.mapList[0].totalNum)
        // weekAddActualNum: reportData.noSaleJson.mapList[2].weekAddActualNum,
        // weekAddTotalNum: reportData.noSaleJson.mapList[2].weekAddTotalNum
      }
    }
    if (reportData.realSaleJson.mapList[2]) {
      this.parts.realSell.realSellRepertoryRatyData.sell.weekAddActualNum = reportData.realSaleJson.mapList[2].weekAddActualNum;
      this.parts.realSell.realSellRepertoryRatyData.sell.weekAddTotalNum = reportData.realSaleJson.mapList[2].weekAddTotalNum;
    }

    if (reportData.noSaleJson.mapList[2]) {
      this.parts.realSell.realSellRepertoryRatyData.repertory.weekAddActualNum = reportData.noSaleJson.mapList[2].weekAddActualNum;
      this.parts.realSell.realSellRepertoryRatyData.repertory.weekAddTotalNum = reportData.noSaleJson.mapList[2].weekAddTotalNum;
    }


    // 各品牌车联网实销情况

    let saleData = this.convertArrJsonName(reportData.realSaleInfoJson.mapList, 'brandOrType');
    let repertoryData = this.convertArrJsonName(reportData.noSaleInfoJson.mapList, 'brandOrType');
    let brandOrder3 = [];
    if (reportData.type === "carBrand") {
      brandOrder3 = ['欧曼', '欧马可', '奥铃', '时代', '瑞沃', '雷萨'];
    } else if( reportData.type === "carType" ) {
      let arr1 = [];
      let arr2 = [];
      reportData.realSaleInfoJson.mapList.forEach((v) => {
        arr1.push(v.brandOrType);
      });
      reportData.noSaleInfoJson.mapList.forEach((v) => {
        arr2.push(v.brandOrType);
      });
      arr1.length > arr2.length ? brandOrder3 = arr1 :  brandOrder3 = arr2;
    }
    let formatterData = [];
    brandOrder3.forEach(v => {
      let saleRaty = 0;
      let repertoryRaty = 0;
      let saleItem = saleData.find(x => x.name === v);
      if (saleItem) {
        saleRaty = saleItem.actualSalesNum/saleItem.totalNum;
      } else {
        saleRaty = 0;
      }
      let repertoryItem = repertoryData.find(x => x.name === v);
      if (repertoryItem) {
        repertoryRaty = repertoryItem.actualSalesNum/repertoryItem.totalNum;
      } else {
        repertoryRaty = 0;
      }
      if (saleRaty == 0 && repertoryRaty ==0) {
        return;
      } else {
        formatterData.push({
          name: v,
          saleRaty,
          repertoryRaty
        })
      }

    })

    this.titleWidth = this.getTitleWidth(formatterData);
    this.parts.realSell.platformRealSell = formatterData;
  }
  // 改字段名
  convertArrJsonName(json: {}[], oldName: string, newName: string = 'name') {
    return JSON.parse(JSON.stringify(json).replace(eval(`/${oldName}/g`), newName));
  }
  // 改省份名
  convertProvinceName(data: {}[]) {
    return JSON.parse(JSON.stringify(data).replace(eval(`/[省|市|自治区|壮族自治区|回族自治区|维吾尔自治区|特别行政区]/g`), ''));
  }

  getTitleWidth(data) {
    if (data) {
      let long = [];
      data.map(ele => {
        long.push({titleName: ele.name, titleLen: ele.name.length});
      });

      let sortArr = long.sort((a, b) => {
        return b.titleLen - a.titleLen;
      });
      let maxLen = sortArr[0].titleLen;
      if ( /^[\u4e00-\u9fa5]+$/.test(sortArr[0].titleName.trim())) {
        return maxLen > 4 ? maxLen * 14 / 100 + 'rem' : '.61rem';
      } else {
        return maxLen > 4 ? maxLen * 13 / 100 + 'rem' : '.61rem';
      }
    }
  }
}
