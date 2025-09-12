import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberneticPageComponent } from './cybernetic-page.component';

describe('CyberneticPageComponent', () => {
  let component: CyberneticPageComponent;
  let fixture: ComponentFixture<CyberneticPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CyberneticPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CyberneticPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
