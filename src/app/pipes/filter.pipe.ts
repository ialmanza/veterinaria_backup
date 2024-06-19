import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length < 3) return value;
    const resultFilter = [];
    for(const filter of value){
      if(filter.animalID.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultFilter.push(filter);
      }
    }
    return resultFilter;

  }

}
