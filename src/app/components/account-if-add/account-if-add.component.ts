import { Component, OnInit, Input } from '@angular/core';
import { IAccountIfAddData } from './account-if-add.interface';
import NumberFormat from '../../lib/number-format';

@Component({
  selector: 'app-account-if-add',
  templateUrl: './account-if-add.component.html',
  styleUrls: ['./account-if-add.component.scss']
})
export class AccountIfAddComponent implements OnInit {
  data: IAccountIfAddData[] = [{
    sourceVal: [0, 0],
    numberVal: [0, 0],
    name: ''
  }];
  className: string;
  onlyOne: boolean = false;

  /**
   * data: [{
   *  name: string,
   *  numberVal: number[], 12 | [100, 12] 12表示本周新增的个数
   * }]
   * showNum?: false| true
   */

  @Input() showNum: boolean = false;

  @Input("data") set _data(_s: IAccountIfAddData[]){

    if(!_s) return;
    _s.forEach( (val) => {
      val.sourceVal = Array.isArray(val.numberVal) ? val.numberVal.map(e => e) : val.numberVal;
      if ( typeof(val.numberVal) === 'number' ) {
        let result = NumberFormat.render(val.numberVal as number);
        this.onlyOne = true;
        this.showNum = false;

        val.numberVal = [result.value];
        val.name = val.name.replace(/(\(|（)/g, '$1' + result.unit);

      } else {
        this.onlyOne = false;
        let newAdd = val.numberVal[1];
        if (newAdd > 0){
          val.addValue = "+" + newAdd;
        } else if (newAdd == 0) {
          val.addValue = '';
        }
        let result = NumberFormat.render(val.numberVal[0] as number);
        val.numberVal[0] = result.value;
        val.name = val.name.replace(/(\(|（)/g, '(' + result.unit);
      }
    })
    this.data = _s;

    if(_s.length === 5) {
      this.className = 'items5';
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
