import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpandingTextareaComponent } from './expanding-textarea.component';

describe('ExpandingTextareaComponent', () => {
  let component: ExpandingTextareaComponent;
  let fixture: ComponentFixture<ExpandingTextareaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandingTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandingTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
