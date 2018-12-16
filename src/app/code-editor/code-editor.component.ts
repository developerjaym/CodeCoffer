import { Component, OnInit, Input, forwardRef, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CopyService } from '../copy.service';
@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CodeEditorComponent),
    multi: true
  }]
})
export class CodeEditorComponent implements OnInit, ControlValueAccessor {

  @Input('title')
  title: string;

  value: string = '';

  lines: string;

  @ViewChild('lineNumbers')
  lineNumbers: ElementRef

  @ViewChild('codeEditor')
  codeEditor: ElementRef

  onChange = (v: string) => { };

  private readonly FONT_SIZE = 14;
  private readonly LINE_HEIGHT = 16;
  private readonly MIN_LINES = 18;

  constructor(private copyService: CopyService, private renderer: Renderer2 ) { }

  ngOnInit() {
    this.renderer.setStyle(this.lineNumbers.nativeElement, 'font-size', this.FONT_SIZE);
    this.renderer.setStyle(this.codeEditor.nativeElement, 'font-size', this.FONT_SIZE);
  }

  writeValue(value) {
    this.value = value;
    this.lines = this.getLines();
    const lineCount = this.getLineCount();
    const height = (lineCount * this.LINE_HEIGHT) + 'px';
    this.renderer.setStyle(this.lineNumbers.nativeElement, 'height', height);
    this.renderer.setStyle(this.codeEditor.nativeElement, 'height', height);
    this.renderer.setStyle(this.lineNumbers.nativeElement, 'width', (String(lineCount).length * this.FONT_SIZE) + 'px');
    this.onChange(value);
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) { }

  copy() {
    this.copyService.copy(this.value);
  }

  private getLines(): string {
    if (!this.value) {
      return '1';
    }
    else {
      this.lines = this.value.split('\n').reduce((prev, cur, i) => prev + '\n' + (i + 2), '1');
    }
    return this.lines;
  }

  private getLineCount(): number {
    if (!this.lines) {
      return 1;
    }
    else {
      const count = this.lines.split('\n').length + 1;
      return count < this.MIN_LINES ? this.MIN_LINES : count;
    }
  }

}
