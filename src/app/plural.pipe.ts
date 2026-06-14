import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'users',
  pure: true,
})
export class PluralPipe implements PipeTransform {
  
  transform(value: number, args: string[]): string {
    const [one, twoFour, many]: string[] = args;
    const lastTwo: number = value % 100;
    const last: number = value % 10;
    let count: string = many;
    
    if (lastTwo >= 11 && lastTwo <= 14) {
      count = many;
    } else if (last === 1) {
      count = one;
    } else if (last >= 2 && last <= 4) {
      count = twoFour;
    } else {
      count = many;
    }
    return `${ value } ${ count }`;
  }
  
}
