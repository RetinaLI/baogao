import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { IPieData } from './pie.interface';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})

/**
 * IPieData[], 必传，包含name，value;
 * chartTitle, 必传，环形图中间显示的数据;
 * chartColor, 必传，环形图需要的颜色，按照顺序;
 * id, 必传，echarts的id;
 * label: 非必传，默认false， 饼图对应位置需要显示仅value时，传true;
 * nameData：非必传，默认false，饼图需要显示各颜色对应name时，传true;
 * richData: 非必传，默认false，饼图对应位置需要显示name和value时，传true;
 */

export class PieComponent implements OnInit {

  @Input('pieData') set _pieData(data: IPieData[]) {
    this.pieData = data || [];
    this.renderOption();
    this.renderChart();
  }

  // @Input("chart-title") chartTitle: any;
  @Input("chartTitle") set chartTitle ( _chartTitle: any) {
    this.option.title.text = _chartTitle;
    this.option.series[0].name = _chartTitle;
    this.renderChart();
  }
  @Input() chartColor: string[];
  @Input() label?: boolean;
  @Input() nameData?: boolean;
  @Input() richData?: boolean;
  @Input() titleColor?: string = '#D5D5D5';
  @Input() titleFontSize?: string = '16';
  @Input('chart-radius') set chartRadius (radius: string[]) {
    this.option.series[0].radius = radius;
    this.renderChart();
  };
  @Input() set _id (_s: string) {
    this.id = _s;
  }

  @Input("height") set _height(_h: string){
    this.height = _h;
    if(this.$element) this.$element.style.height = _h;
    this.resizeChart();
  }
  public percent: string[] = [];
  // @output()
  private pieData: IPieData[] = [];
  private height: string = '2.2rem';
  id: string;
  private $element:HTMLElement;
  private chart: any;
  // private chartRadius = ['40%', '55%'];
  public option = {
    title : {
      text: '',
      x: 'center',
      y: 'center',
      textStyle: {
        color: this.titleColor,
        fontSize: this.titleFontSize
      }
    },
    tooltip: {
      trigger: 'item',
      // formatter: "{a} <br/>{b}: {c} ({d}%)"
      // formatter: "{b}: {d}%"
      formatter: function (params) {
        return params.name + ": " + params.value;
      }
    },
    legend: {
      bottom: 0,
      left: 'center',
      data: [],
      textStyle: {
        color: '#aaa',
        fontSize: 10
      },
      icon: 'circle',
      itemHeight: 6,
      itemWidth: 8
    },
    color: [],
    series: [
      {
        name:'',
        type:'pie',
        radius: ['40%', '55%'],
        avoidLabelOverlap: true,
        minAngle: 5,
        label: {
          normal: {
            show: false,
            formatter: '{d}%',
            // formatter: function(v) {
            //     // this.percent.push(v.percent);
            //   return v.percent + '%';
            // },
            // formatter: '{b|{b}}\n{hr|}{per|{d}%}',
            position: 'outside',
            textStyle: {
              fontSize: '14',
              fontWeight: 'bold',
              color: '#666'
            },
            rich: {
              b: {
                fontSize: 12,
                lineHeight: 16,
                align: 'center'
              },
              per: {
                color: '#4475FD',
                fontSize: 14,
                lineHeight: 14,
                align: 'center'
              }
            }
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false,
            length: 10,
            length2: 18,
          },
          emphasis: {
            show: false
          }
        },
        data:[]
      }
    ]
  }

  constructor() {
    this.id = `chart-${FOTON_GLOBAL.uuid()}`;
  }

  renderOption() {
    this.option.series[0].data = this.pieData;
    this.option.title.textStyle.color = this.titleColor;
    this.option.title.textStyle.fontSize = this.titleFontSize;

    // this.option.title.text = this.chartTitle;
    // this.option.series[0].name = this.chartTitle;
    this.option.color = this.chartColor;
    this.option.series[0].label.normal.show = this.label;
    this.option.series[0].label.emphasis.show = this.label;
    this.option.series[0].labelLine.normal.show = this.label;
    this.option.series[0].labelLine.emphasis.show = this.label;

    if(this.nameData === true) {
      this.option.legend.data = this.pieData.map(v => {
        let name = v.name;
        return { name };
      })
    } else {
      this.option.legend.data = [];
    }

    if(this.richData === true) {
      this.option.series[0].label.normal.show = true;
      this.option.series[0].labelLine.normal.show = true;
      // this.option.series[0].label.normal.formatter = '{b|{b}}\n{hr|}{per|{d}%}';
      this.option.series[0].radius = ['45%', '65%'];
    }
    if (this.option.title.text ==='故障占比') {
      this.option.tooltip.formatter = function (params) {
        if(Number(params.value) < 0.1) {
          return params.name + ':' + '不足0.1%';
        }
        return params.name + ':' + Math.round(params.value*10)/10+'%'
      }
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.$element = document.getElementById(this.id);
    if(this.height) this.$element.style.height = this.height;
    this.renderOption();
    this.chart = echarts.init(this.$element);

    this.renderChart();
  }

  renderChart() {
    if(this.chart)
      this.chart.setOption(this.option);
  }

  resizeChart(){
    if(!this.chart) return;
    this.chart.resize();
  }
}
