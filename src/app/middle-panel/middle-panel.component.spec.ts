import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddlePanelComponent } from './middle-panel.component';

describe('MiddlePanelComponent', () => {
  let component: MiddlePanelComponent;
  let fixture: ComponentFixture<MiddlePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddlePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddlePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
