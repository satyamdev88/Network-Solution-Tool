import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortCheckerComponent } from './port-checker.component';

describe('PortCheckerComponent', () => {
  let component: PortCheckerComponent;
  let fixture: ComponentFixture<PortCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortCheckerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
