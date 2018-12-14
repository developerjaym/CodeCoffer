import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements OnInit{

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.focus();
  }

}
