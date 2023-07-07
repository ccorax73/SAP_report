import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removecomma'
})
export class CustomPipe implements PipeTransform {

  transform(value: any): string {
      if (value !== undefined && value !== null) {
        return value.replace(/,/g, " ");
      } else {
        return "";
      }
    }

}
