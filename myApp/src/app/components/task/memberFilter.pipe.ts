import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'memberFilter'
})

@Injectable()
export class MemberFilterPipe implements PipeTransform {

  transform(items: any, expression: string): any {
    if (!expression) {
      return items;
    }
    else {
      return items.filter(item => item.email.toLowerCase().indexOf(expression) != -1)
    }

  }
}


  // transform(items: any, args: string[]): any {
  //   let data = args[0] || '';
  //   let filter = data.toLocaleLowerCase();
  //   return filter ? items.filter(item=> item.email.toLocaleLowerCase().indexOf(filter) != -1) : items;
  // }

  // if (filter && Array.isArray(items)) {
  //   let filterKeys = Object.keys(filter);
  //   return items.filter(item =>
  //     filterKeys.reduce((memo, keyName) =>
  //     (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "", true));
  // } else {
  //   return items;
  // }

