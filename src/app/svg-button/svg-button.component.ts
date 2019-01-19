import { Component, OnInit, ElementRef, Input, Renderer2 } from '@angular/core';
import { SvgService } from '../svg.service';

@Component({
  selector: 'app-svg-button',
  templateUrl: './svg-button.component.html',
  styleUrls: ['./svg-button.component.css']
})
export class SvgButtonComponent implements OnInit {

  @Input("src")
  svgName: string;

  @Input("label")
  label?: string;  

  constructor(private element: ElementRef, private renderer: Renderer2, private svgService: SvgService) { }

  ngOnInit() {
    this.svgService.getSvgByName(this.svgName).subscribe(newNode => {
      this.element.nativeElement.innerHTML = newNode;
      this.renderer.setAttribute(this.element.nativeElement, "tabindex", "0");
      this.renderer.setAttribute(this.element.nativeElement, "role", "button");
      this.renderer.setAttribute(this.element.nativeElement, "aria-label", this.label || this.element.nativeElement.title);
    });
  }

}
