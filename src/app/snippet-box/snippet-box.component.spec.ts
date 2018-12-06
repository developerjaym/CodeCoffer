import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetBoxComponent } from './snippet-box.component';

describe('SnippetBoxComponent', () => {
  let component: SnippetBoxComponent;
  let fixture: ComponentFixture<SnippetBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnippetBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
