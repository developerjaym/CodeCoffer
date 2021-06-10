import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StyleEditorComponent } from './style-editor.component';

describe('StyleEditorComponent', () => {
  let component: StyleEditorComponent;
  let fixture: ComponentFixture<StyleEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StyleEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
