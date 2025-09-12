import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatPageComponent } from './feat-page.component';

describe('FeatPageComponent', () => {
  let component: FeatPageComponent;
  let fixture: ComponentFixture<FeatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
