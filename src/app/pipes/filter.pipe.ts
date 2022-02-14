import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allChannels: any[], searchText: any) {
    if (!allChannels || !searchText) {
      return allChannels;
    }
    return allChannels.filter(em => em.category.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
  }
}
