import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrikeThroughBoxComponent } from './strike-through-box.component';

describe('StrikeThroughBoxComponent', () => {
  let component: StrikeThroughBoxComponent;
  let fixture: ComponentFixture<StrikeThroughBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrikeThroughBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrikeThroughBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
