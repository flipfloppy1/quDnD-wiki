import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutationPageComponent } from './mutation-page.component';

describe('MutationPageComponent', () => {
  let component: MutationPageComponent;
  let fixture: ComponentFixture<MutationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MutationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MutationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
