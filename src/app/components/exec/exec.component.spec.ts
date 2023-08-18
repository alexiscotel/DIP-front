import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecComponent } from './exec.component';

describe('ExecComponent', () => {
  let component: ExecComponent;
  let fixture: ComponentFixture<ExecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExecComponent]
    });
    fixture = TestBed.createComponent(ExecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
