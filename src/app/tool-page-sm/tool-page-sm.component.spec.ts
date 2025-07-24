import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolPageSmComponent } from './tool-page-sm.component';

describe('ToolPageSmComponent', () => {
  let component: ToolPageSmComponent;
  let fixture: ComponentFixture<ToolPageSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolPageSmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolPageSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
