import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-strike-through-box',
  templateUrl: './strike-through-box.component.html',
  styleUrls: ['./strike-through-box.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StrikeThroughBoxComponent),
    multi: true
  }]
})
export class StrikeThroughBoxComponent implements OnInit, ControlValueAccessor {

  @Input('label')
  label: string = '';

  value: boolean = false;

  onChange = (v: boolean)=>{};

  constructor() { }

  ngOnInit() {
  }

  writeValue(value) {
    this.value = value;
    this.onChange(value);
  }

  registerOnChange(fn) { 
    this.onChange = fn; 
  }

  registerOnTouched(fn) { }
}
