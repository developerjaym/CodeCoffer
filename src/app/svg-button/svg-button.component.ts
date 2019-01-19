import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { SvgService } from '../svg.service';

@Component({
  selector: 'app-svg-button',
  templateUrl: './svg-button.component.html',
  styleUrls: ['./svg-button.component.css']
})
export class SvgButtonComponent implements OnInit {

  @Input("src")
  svgName: string;


  constructor(private element: ElementRef, private svgService: SvgService) { }

  ngOnInit() {
    this.svgService.getSvgByName(this.svgName).subscribe(newNode => {
      this.element.nativeElement.innerHTML = newNode;
    });
  }

}
