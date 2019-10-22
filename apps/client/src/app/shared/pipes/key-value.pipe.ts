import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyValue'
})
export class KeyValuePipe implements PipeTransform {
  transform(key: number, map: Map<number, string>): string {
    let value = map.get(key);
    return value ? value : '';
  }
}
