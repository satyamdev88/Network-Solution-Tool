import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacFinderComponent } from './mac-finder.component';

describe('MacFinderComponent', () => {
  let component: MacFinderComponent;
  let fixture: ComponentFixture<MacFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MacFinderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MacFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
