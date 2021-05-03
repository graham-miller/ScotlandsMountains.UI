import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metresToFeet'
})
export class MetresToFeetPipe implements PipeTransform {

  transform(value: number): number {
    return Math.floor(value * 3.28084);
  }
}
