import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[boldOnHover]'
})
export class BoldOnHoverDirective {

  @HostBinding('style.font-weight') fontWeight = 'normal';

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.fontWeight = 'bold';
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.fontWeight = 'normal';
  }
  
}
