import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceTitle',
  standalone: true
})
export class SliceTitlePipe implements PipeTransform {

  transform(value: any, maxCharacters = 8): unknown {
    const dots = value?.length>maxCharacters ? "..." : "";
    return `${value?.substring(0, maxCharacters)}${dots}`
  }

}
