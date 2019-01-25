import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableTagsAreaComponent } from './editable-tags-area.component';

describe('EditableTagsAreaComponent', () => {
  let component: EditableTagsAreaComponent;
  let fixture: ComponentFixture<EditableTagsAreaComponent>;

  beforeEach(async(() => {
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
