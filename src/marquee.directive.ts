import { Directive, ElementRef, Input, OnChanges, Renderer } from '@angular/core';
@Directive({ selector: '[marqueeContent]' })
export class InfoMarqueeDirective implements OnChanges {
    @Input() marqueeContent: string;
    constructor(private el: ElementRef, private renderer: Renderer) {
       
    }

    ngOnChanges(changes) {
      let newTitle = changes.marqueeContent['currentValue'];
      setTimeout(() => {
        let textWidth = this.el.nativeElement.offsetWidth;
        let containerWidth = this.el.nativeElement.parentElement.clientWidth;
      
        if(textWidth > containerWidth) {
          console.log('Apply move class Marquee styles');
          this.renderer.setElementStyle(this.el.nativeElement, 'content', newTitle)
          this.renderer.setElementClass(this.el.nativeElement, 'move', true);
          // add content attribute with changes...
        } else {
          console.log('remove move class... No marquee style');
          this.renderer.setElementAttribute(this.el.nativeElement, 'content', '');
          this.renderer.setElementClass(this.el.nativeElement, 'move', false);
        }
      }, 100);
      console.log(newTitle);
    }

    private getElementWidth() {
      
    }
}