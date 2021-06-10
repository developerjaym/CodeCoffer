import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SnippetBoxComponent } from './snippet-box.component';

describe('SnippetBoxComponent', () => {
  let component: SnippetBoxComponent;
  let fixture: ComponentFixture<SnippetBoxComponent>;

  beforeEach(waitForAsync(() => {
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
