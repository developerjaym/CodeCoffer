import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StrikeThroughBoxComponent } from './strike-through-box.component';

describe('StrikeThroughBoxComponent', () => {
  let component: StrikeThroughBoxComponent;
  let fixture: ComponentFixture<StrikeThroughBoxComponent>;

  beforeEach(waitForAsync(() => {
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
