import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
  pure: true,
})
export class PhonePipe implements PipeTransform {
  
  transform(value: string, mode = 'international'): string {
    const cleanNumber: string = value.replace(/\D/g, '');
    const group1: string = cleanNumber.substring(0, 3);
    const group2: string = cleanNumber.substring(3, 6);
    const group3: string = cleanNumber.substring(6, 8);
    const group4: string = cleanNumber.substring(8, 10);

    switch (mode) {
      case 'international':
        return `+${ group1 } ${ group2 } ${ group3 } ${ group4 }`;
      case 'national':
        return `${ group2 } ${ group3 } ${ group4 }`;
      case 'masked':
        const maskedMiddle: string = '*'.repeat(group3.length + group4.length - 2);
        return `+${ group1 } ${ group2 } ${ maskedMiddle } ${ group4 }`;
      default:
        return value;
    }
  }

}
