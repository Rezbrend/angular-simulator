import { Directive, HostListener, HostBinding, Input } from '@angular/core';
import { IGradientConfiguration } from '../interfaces/IGradientConfiguration';

@Directive({
  selector: '[border]',
})
export class BorderDirective {
  
  @Input() gradientConfiguration: IGradientConfiguration = {
    delay: 1000,
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    thickness: '2px',
  };

  @HostBinding('style.border-width') borderWidth: string = '0px';
  @HostBinding('style.border-style') borderStyle: string = 'none';
  @HostBinding('style.border-image') borderImage: string = '';

  private timeoutId!: number;

  @HostListener('mouseenter')
  onMouseEnter() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.borderWidth = this.gradientConfiguration.thickness ?? '2px';
      this.borderStyle = 'solid';
      const gradientColors = this.gradientConfiguration.colors ? this.gradientConfiguration.colors.join(', ') : '#ff0000, #00ff00, #0000ff';
      this.borderImage = `linear-gradient(90deg, ${gradientColors}) 1`;
    }, this.gradientConfiguration.delay ?? 1000);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    clearTimeout(this.timeoutId);
    this.borderWidth = '0px';
    this.borderStyle = 'none';
    this.borderImage = '';
  }
  
}
