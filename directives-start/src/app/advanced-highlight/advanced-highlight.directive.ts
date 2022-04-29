import {Directive, ElementRef, Renderer2, OnInit, HostListener, Input, HostBinding} from '@angular/core';

@Directive({
  selector: '[appAdvancedHighlight]'
})
export class AdvancedHighlightDirective implements OnInit {
  @Input() defaultColor: string;
  @Input('appAdvancedHighlight') overColor: string = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private el: ElementRef, private render: Renderer2) { }

  ngOnInit(): void {
    //this.render.setStyle(this.el.nativeElement, 'background-color', 'green', false)
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    //this.render.setStyle(this.el.nativeElement, 'background-color', this.overColor)
    this.backgroundColor = this.overColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    //this.render.setStyle(this.el.nativeElement, 'background-color', this.defaultColor)
    this.backgroundColor = this.defaultColor;
  }

}
