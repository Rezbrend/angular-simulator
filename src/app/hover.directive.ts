import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[boldOnHover]'
})
export class BoldOnHoverDirective {

  @HostBinding('style.font-weight') fontWeight: string = 'normal';

  @HostListener('mouseenter')
  onMouseEnter() {
    this.fontWeight = 'bold';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.fontWeight = 'normal';
  }
}
