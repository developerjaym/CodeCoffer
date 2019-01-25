import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'app-expanding-textarea',
  templateUrl: './expanding-textarea.component.html',
  styleUrls: ['./expanding-textarea.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ExpandingTextareaComponent),
    multi: true
  }]
})
export class ExpandingTextareaComponent implements ControlValueAccessor {

  @Input('title')
  title: string;

  @Input('placeholder')
  placeholder: string;

  value: string = '';

  lines: string;

  onChange = (v: string) => { };

  constructor() { }

  writeValue(value) {
    this.value = value;
    this.lines = this.getLines();
    this.onChange(value);
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) { }

  private getLines(): string {
    if (!this.value) {
      return '';
    }
    else {
      return this.value.split('\n').reduce((prev, cur, i) => prev + '\n', '');
    }
  }
}
