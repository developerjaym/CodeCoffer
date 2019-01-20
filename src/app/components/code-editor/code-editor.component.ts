import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CopyService } from '../../services/copy.service';
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

  onChange = (v: string) => { };

  constructor(private copyService: CopyService) { }

  ngOnInit() {
  }

  writeValue(value) {
    this.value = value;
    this.lines = this.getLines();
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
      return this.value.split('\n').reduce((prev, cur, i) => prev + '\n' + (i + 2), '1');
    }
  }
}
