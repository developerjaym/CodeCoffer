import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportHelperComponent } from './import-helper.component';

describe('ImportHelperComponent', () => {
  let component: ImportHelperComponent;
  let fixture: ComponentFixture<ImportHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportHelperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
