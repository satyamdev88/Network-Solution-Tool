import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ipv4CalculatorComponent } from './ipv4-calculator.component';

describe('Ipv4CalculatorComponent', () => {
  let component: Ipv4CalculatorComponent;
  let fixture: ComponentFixture<Ipv4CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ipv4CalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ipv4CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
