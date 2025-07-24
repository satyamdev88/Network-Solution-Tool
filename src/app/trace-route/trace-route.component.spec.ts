import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceRouteComponent } from './trace-route.component';

describe('TraceRouteComponent', () => {
  let component: TraceRouteComponent;
  let fixture: ComponentFixture<TraceRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraceRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraceRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
