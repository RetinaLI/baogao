import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sub'
})
export class SubPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let index = Math.floor(value.length/2);
    // return null;
    return value.length > 5 ? `${value.slice(0, index)}\n${value.substr(index)}` : value;
  }
}
