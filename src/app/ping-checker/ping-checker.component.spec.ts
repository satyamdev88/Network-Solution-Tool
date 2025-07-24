import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PingCheckerComponent } from './ping-checker.component';

describe('PingCheckerComponent', () => {
  let component: PingCheckerComponent;
  let fixture: ComponentFixture<PingCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PingCheckerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PingCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
