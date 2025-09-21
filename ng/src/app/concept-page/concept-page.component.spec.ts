import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptPageComponent } from './concept-page.component';

describe('ConceptPageComponent', () => {
  let component: ConceptPageComponent;
  let fixture: ComponentFixture<ConceptPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConceptPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
