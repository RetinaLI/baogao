import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { IMapData } from './map.interface';
import { $BLUE, $YELLOW } from '../../../global.variable';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  // @Input() mapData: IMapData[] = [];
  @Input('mapData') set _mapData(mapData: IMapData[]) {
    this.mapDataMap = mapData;
    this.lastRender(2);
  }
  @Input() name: string;
  mapDataMap: IMapData[] = [];
  private themes = {
    sell: {
      color: ['#ECF1FF', '#89A7FE'],
      areaColor: '#EDF2FF',
      markPointColor: $BLUE,
      markPointLabelColor: $BLUE,
      symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAABT1JREFUWAmtV89rXFUYfW+SjNH8gCqSlNaqECykUkERNAs3WdhFqAuNi4oYl9lnK9K9BNd20erChT8W/kDrPxAEQTDYQrWtaBJM3ATya5OZPL/z5p2X8+7c++a9SS7cft893/nOd+bOvM4kjk624j7bkz77ojoD63D78VPpRVQxUYXTj8FQT6nxXmZ61UNDT4oHTYcMhXCfkTpc9AfNeMS7uL5hPszVCnFCeNfgTDCE67wCxzfAh1HAV/Nh5PtiwUBG8GHsLdTcYe6ZTYha09ytaY+bF4ZbUc+aB/saUnFNSMlrFvx0Ly8vDx0cHLzVbrc/S5Lkju3tbN8Bhho45GcR+jpTc9R0eWvpcGO5ES+Ke8By7MFsp0bN3H3bvdZ9GLc+GGc/9aiP6M7n2UrFxYJGFaI4hg3Nz883Dw8PP+rl0q2jB73QsA0t6uos9cDcqMeLoEYVoGhq1tqG+jFL8+iFRrZrmYZBLMbOqfMvMY3I493d3TdGR0e/ULLlyd2/2ys3b8dn7q3HF1C7eD755/0ryfb00wMzdqQOStHe3t7bY2Nj31iKh40bJT58jMC4EtwcVkFMzsRToyAuLS015+bmvrL0cZyx2kfJf9c/bT+48UPj5c3t6MlWO2piI7/9S3zhwUZ79bXLcaMRxyOdjihqNpsv7u/vf7KystI2jHNQZs7IljQSZGSRZ8RCbjfz5sjIyOckWkw+vNVaXbnbeEGwrnRm+ui36wuDl61AvcgMX7N36mtoZBt9bg6MK+FTSSAUaTweHh6+qiR8DHqZBR8ccLU308q1tRbIYxh2F2+AUev2vjZeUuDmj0n+0VDcl7vcTMs7J+vvquEJLVto0B3FcXxWG+5tDDx1/JxopTvvcI9x0XKN+R64tNF3w8eK3Zkr3M2oh8BYLc2QYZ9Iitn/pf+qp4vn2mt6LstdrmltZvzgPFcvZNjl5YKtVutXLS5cibb1XJa7XEcrn1GmUdUwNeKdnZ3veUC89MzgqzPT7VXFfDk44Got06pklH11DUeLi4vf2Vv5kAIW4w/eHThbZho1cMBlHzSgxXPVCIFcJGtSjDleWJ5vbm5enZiY0C8PtCa//3X4862fojN/bAyeB/Dcudb6wuvR9vPPDr1ix8Kcra2ta5OTk98afmSbXxaaG5zjyPNFI4ww5/7Ywa+rYduP2sbX66h9431st9TXQi80Mi1oQhszfL/g6IsxvzkCMEzT/HUGsUdsQ/wx26NTU1Pj/ZhGD3qhkWlBE9quYfqgL8ZahnETMJzessXxtbW1d+yvioe9rhoccNFjm7cLLWiemmF8NPSW+bFIb9lqY7bHZ2dnn1hfX3/P/qL40oz9aeZ3sZEDQw0ccLMevd2yjwNumTebRh4MLyzgWKz7YpdYpyXtydI08GuWDxajPmDENKIZ58Kq8nuY5guN2UFrFNehiqGFtZBZ3wzF6v+At241qWLIaVBxYjSr0e0hV/sLeeiGQaIxxhBGQQ5TQ4qBpzWeGX1c1AqrimE0qGmcKY4ci2ca6qDHBn0cXw8x9ndFGkbBNeViWtecojrMZ1x55CqPGHiaa1/6jUbAZwI1xTVnn4prXlYnz43oIcb+QlQDmhdIdtAac0ZwNXd79axmmDOCp7n25TX9SAAsG6w1zV3hsrNrSM+auxp5zTfYh1HAV/Nh5PtiPlyKPozlQs29YZCqGAhxQnhhKJ1YDOFCKaahASG82N051eGio47JLm6vYb3qvhdwGliXUYpWMVSFQ73TiEGzEK9jpg63H+OlRil4UhP99lcyR5Ma/wcTNr6KafiWBQAAAABJRU5ErkJggg=='
    },
    repertory: {
      color: ['#A0EBCE', '#23C184'],
      areaColor: '#D7F4E8',
      markPointColor: $YELLOW,
      markPointLabelColor: '#666',
      symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAADWUlEQVRYheXYT0/iQBQA8Le7IiqiHvwE7J3PwJWL4aABVxO/BB+Aw56IJt65wEWN8iU2XBXw6N9LG0RCVGwzkZaZ2YMdM8z2z0wpZN19ybuU0vfjZdpXBuA/iC8R56dATg0/K2gkcJUCXyVzaugokZPgI8GKhb8ppio8NNYPOieZYeHKYF9oqVRaQggVMMZHhJArSukrpfSVEHKFMT5CCBVKpdKSBFwJrIJlhWMIoU1K6S0NjluE0CYAxFzgodAq2Fg2m43btr0vAR0L27b3s9lsnIPLopXAY1gAiFmWdaCKZWFZ1gG7jgc6EKyCnTcMY0tEEEqH9YfLx0KrpqUbZTPdKJuFVk2rP1w+EkqH4vmGYWwBwHxYdBD4o7PFYjFBCLkbK26/vWxcVJ6+//pJ3XLjovJk2G8vYz+QkLtisZhw6XQosGd3B4PBD7GzflgeLXZ6MBj8UOyyFPgDCwBxy7KO+aJnnXYvCMvyrNPuCWv5GADiLuhQ4D+6CwALznP2IwqtmiYLLrRqmrAsrgBgwafLUmCxu3Osuw7Y4IumG2VTFpxulE0BbDhg1mX++ezWZSlwjAMv0vcpFgmYUvoKAIsKy0IJvAAAixjja75ivlnVZcH5ZlXnv4sxvnbAbssiGvBwODzhi9YVbrq6cNMNh8OTqYP7/f7u2Dqc4LHW7/d3pw7O5XJrroPjvPLsiT2vPLsNjlwutzZ1MAAkut3utnDzvI/mTruXb1Z1Nprzzape77R7bqO52+1uA0BiFuAlAFg2TfNQRMiGaZqHALDsXGtq4DgPTqVSq2HQpmkeplKpVQEc6WNtbHCwZeEUXNE0bQdjfB8ExRjfa5q2AwArznf55TDR4PAdzXyXASAJACuZTGZd1/U9hNDpaDS6IYQYhBBjNBrdIIROdV3fy2Qy6w42KbEclEZz0LJwRQPAKpdrTvLHvLCRvfx4ddkNzcPdMsmdF4QNBfZ8gfdAszXN45PCsYQPduIX+KAui2gGZ3g+2XF2Ho8N/RdJFS12mod7JTvPq7NK2CCwH5rBebyY7HO+q1P5m++HdoMHJQ+deCNFFS3uqcUCUmaPTQnrBxbRf81mYBA6CD7z7VZZtBtcNWVqKIXMBVXxKtcMFSoFosyJ49NAZ4H/t+M3/Zl7z4HWhfQAAAAASUVORK5CYII='
    },
    run: {
      color: ['#ECF1FE', '#4475FD'],
      areaColor: '#EDF2FF',
      markPointColor: $BLUE,
      markPointLabelColor: $BLUE,
      symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAABT1JREFUWAmtV89rXFUYfW+SjNH8gCqSlNaqECykUkERNAs3WdhFqAuNi4oYl9lnK9K9BNd20erChT8W/kDrPxAEQTDYQrWtaBJM3ATya5OZPL/z5p2X8+7c++a9SS7cft893/nOd+bOvM4kjk624j7bkz77ojoD63D78VPpRVQxUYXTj8FQT6nxXmZ61UNDT4oHTYcMhXCfkTpc9AfNeMS7uL5hPszVCnFCeNfgTDCE67wCxzfAh1HAV/Nh5PtiwUBG8GHsLdTcYe6ZTYha09ytaY+bF4ZbUc+aB/saUnFNSMlrFvx0Ly8vDx0cHLzVbrc/S5Lkju3tbN8Bhho45GcR+jpTc9R0eWvpcGO5ES+Ke8By7MFsp0bN3H3bvdZ9GLc+GGc/9aiP6M7n2UrFxYJGFaI4hg3Nz883Dw8PP+rl0q2jB73QsA0t6uos9cDcqMeLoEYVoGhq1tqG+jFL8+iFRrZrmYZBLMbOqfMvMY3I493d3TdGR0e/ULLlyd2/2ys3b8dn7q3HF1C7eD755/0ryfb00wMzdqQOStHe3t7bY2Nj31iKh40bJT58jMC4EtwcVkFMzsRToyAuLS015+bmvrL0cZyx2kfJf9c/bT+48UPj5c3t6MlWO2piI7/9S3zhwUZ79bXLcaMRxyOdjihqNpsv7u/vf7KystI2jHNQZs7IljQSZGSRZ8RCbjfz5sjIyOckWkw+vNVaXbnbeEGwrnRm+ui36wuDl61AvcgMX7N36mtoZBt9bg6MK+FTSSAUaTweHh6+qiR8DHqZBR8ccLU308q1tRbIYxh2F2+AUev2vjZeUuDmj0n+0VDcl7vcTMs7J+vvquEJLVto0B3FcXxWG+5tDDx1/JxopTvvcI9x0XKN+R64tNF3w8eK3Zkr3M2oh8BYLc2QYZ9Iitn/pf+qp4vn2mt6LstdrmltZvzgPFcvZNjl5YKtVutXLS5cibb1XJa7XEcrn1GmUdUwNeKdnZ3veUC89MzgqzPT7VXFfDk44Got06pklH11DUeLi4vf2Vv5kAIW4w/eHThbZho1cMBlHzSgxXPVCIFcJGtSjDleWJ5vbm5enZiY0C8PtCa//3X4862fojN/bAyeB/Dcudb6wuvR9vPPDr1ix8Kcra2ta5OTk98afmSbXxaaG5zjyPNFI4ww5/7Ywa+rYduP2sbX66h9431st9TXQi80Mi1oQhszfL/g6IsxvzkCMEzT/HUGsUdsQ/wx26NTU1Pj/ZhGD3qhkWlBE9quYfqgL8ZahnETMJzessXxtbW1d+yvioe9rhoccNFjm7cLLWiemmF8NPSW+bFIb9lqY7bHZ2dnn1hfX3/P/qL40oz9aeZ3sZEDQw0ccLMevd2yjwNumTebRh4MLyzgWKz7YpdYpyXtydI08GuWDxajPmDENKIZ58Kq8nuY5guN2UFrFNehiqGFtZBZ3wzF6v+At241qWLIaVBxYjSr0e0hV/sLeeiGQaIxxhBGQQ5TQ4qBpzWeGX1c1AqrimE0qGmcKY4ci2ca6qDHBn0cXw8x9ndFGkbBNeViWtecojrMZ1x55CqPGHiaa1/6jUbAZwI1xTVnn4prXlYnz43oIcb+QlQDmhdIdtAac0ZwNXd79axmmDOCp7n25TX9SAAsG6w1zV3hsrNrSM+auxp5zTfYh1HAV/Nh5PtiPlyKPozlQs29YZCqGAhxQnhhKJ1YDOFCKaahASG82N051eGio47JLm6vYb3qvhdwGliXUYpWMVSFQ73TiEGzEK9jpg63H+OlRil4UhP99lcyR5Ma/wcTNr6KafiWBQAAAABJRU5ErkJggg=='
    }
  }

  private option = {
    backgroundColor: '#fff',
    tooltip: {
      trigger: 'item',
      formatter: "{b} : {c}"
    },
    visualMap: {
      show: false,
      min: 0,
      max: 10,
      type: 'continuous',
      inRange: {
        color: ['']
      }
    },
    series: [{
      type: 'map',
      map: 'china',
      zoom: 1,
      itemStyle: {
        normal: {
          areaColor: '#86A5FD',
          borderColor: '',
          borderWidth: 0
        },
        emphasis: {
          areaColor: '#86A5FD'
        }
      },
      data: [],
      // silent: true,
      markPoint: {
        symbol: '',
        symbolSize: 20,
        data: [],
        label: {
          show: false
        }
      }
    }]
  };
  private chart = null;

  constructor(private dataService: DataService) { }

  async ngOnInit() {
    // 注册地图
    await this.dataService.getChinaJson();
    echarts.registerMap('china', this.dataService.chinaJson);
    this.lastRender(1);
  }

  onWindowResize() {
    this.chart.resize();
  }
  stepComplete = {1:false, 2: false};
  lastRender(param) {
    this.stepComplete[param] = true;
    if (this.stepComplete[1] && this.stepComplete[2]) {
      let geoCoord = this.dataService.chinaJson.features;
      let pointData = [];
      if (this.mapDataMap[0] && this.mapDataMap[0].name) {
        pointData = this.mapDataMap.map((v, i) => {
          let coordData = geoCoord.find(x => x.properties.name === v.name);
          let coord = [coordData.properties.cp[0] + '', coordData.properties.cp[1] + ''];
          return {
            name: v.name,
            coord: coord,
            value: v.value,
            label: {
              show: true,
              position: 'right',
              formatter: '{b}',
              color: this.themes[this.name].markPointLabelColor
            }
          }
        }).slice(0, 3);
      }

      // 配置option
      this.option.series[0].itemStyle.normal.areaColor = this.themes[this.name].areaColor;
      this.option.series[0].itemStyle.emphasis.areaColor = this.themes[this.name].areaColor;
      this.option.visualMap.inRange.color = this.themes[this.name].color;
      this.option.visualMap.min = this.mapDataMap[this.mapDataMap.length - 1] ? this.mapDataMap[this.mapDataMap.length - 1].value : 0;
      this.option.visualMap.max = this.mapDataMap[0] ? this.mapDataMap[0].value : 100;
      if (this.name === 'run') {
        this.option.series[0].markPoint.symbol = 'none';
      } else {
        this.option.series[0].markPoint.symbol = this.themes[this.name].symbol;
        this.option.series[0].markPoint.data = pointData;
      }

      this.option.series[0].data = this.mapDataMap;
      this.chart = echarts.init(document.getElementById(this.name));
      this.chart.setOption(this.option);
    }
  }
}
