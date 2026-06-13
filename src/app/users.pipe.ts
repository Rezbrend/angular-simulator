import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'users',
  pure: true,
})
export class UsersPipe implements PipeTransform {
  
  transform(value: number, args: string[]): string {
    const [one, twoFour, many]: string[] = args;

    if (value === 1) {
      return `${ value } ${ one }`;
    } else if (value >= 2 && value <= 4) {
      return `${ value } ${ twoFour }`;
    } else {
      return `${ value } ${ many }`;
    }
  }
  
}
