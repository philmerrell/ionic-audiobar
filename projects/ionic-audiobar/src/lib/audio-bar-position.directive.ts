import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SimplePlaceholderMapper } from '@angular/compiler/src/i18n/serializers/serializer';

@Directive({
  selector: '[ialAudioBarPosition]'
})
export class AudioBarPositionDirective implements OnChanges {
  @Input() offset;

  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges) {
    const changedOffset = changes['offset'].currentValue;
    if (changedOffset) {
      this.setOffset(changedOffset);
    }
  }

  @HostListener('click') togglePlayerVisibility() {
  }

  setOffset(offset) {
    this.el.nativeElement.style.bottom = offset + 'px';
  }

}
