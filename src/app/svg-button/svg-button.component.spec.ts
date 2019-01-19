import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgButtonComponent } from './svg-button.component';

describe('SvgButtonComponent', () => {
  let component: SvgButtonComponent;
  let fixture: ComponentFixture<SvgButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
