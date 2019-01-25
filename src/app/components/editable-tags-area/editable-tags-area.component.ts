import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-editable-tags-area',
  templateUrl: './editable-tags-area.component.html',
  styleUrls: ['./editable-tags-area.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EditableTagsAreaComponent),
    multi: true
  }]
})
export class EditableTagsAreaComponent implements ControlValueAccessor {

  editing: boolean;

  value: string = '';

  onChange = (v: boolean) => {};

  constructor() { }

  writeValue(value) {
    if(value) {
      this.value = value;
      this.onChange(value);
    }
  }

  registerOnChange(fn) { 
    this.onChange = fn; 
  }

  registerOnTouched(fn) { }

}
