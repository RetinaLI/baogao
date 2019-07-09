import { Component, OnInit, Input } from '@angular/core';

import {ISortInterface} from './sort.interface';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  /**
   * data: [{
   *     title: '欧曼',
   *     progress: 50,
   *     lift?: '0' | '1' | '2', // PS:传入字符串 上升-不变-下降[根据数据要求变化]
   *     waybillNumber?: '1112' // 传入运单书
   * }]
   */
  @Input() crown?: boolean = false;
  @Input() show10?: boolean = false;
  @Input() data: ISortInterface[] = [];
  @Input() bar?: boolean = false;
  liftClass: string[] = ['up', 'no', 'down'];

  constructor() { }

  ngOnInit() {

  }
}
