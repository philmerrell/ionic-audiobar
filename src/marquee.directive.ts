import { Directive, ElementRef, Input } from '@angular/core';
@Directive({ selector: '[infoMarquee]' })
export class InfoMarqueeDirective {
    constructor(el: ElementRef) {
      setTimeout(() => {
        console.log(el.nativeElement.offsetWidth);
        console.log(el.nativeElement.parentElement.clientWidth)
      }, 100);
       
    }

    private getElementWidth() {
      
    }
}