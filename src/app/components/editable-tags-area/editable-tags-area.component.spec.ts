import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditableTagsAreaComponent } from './editable-tags-area.component';

describe('EditableTagsAreaComponent', () => {
  let component: EditableTagsAreaComponent;
  let fixture: ComponentFixture<EditableTagsAreaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableTagsAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableTagsAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
