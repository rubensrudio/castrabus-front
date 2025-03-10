import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampanhaFormComponent } from './campanha-form.component';

describe('CampanhaFormComponent', () => {
  let component: CampanhaFormComponent;
  let fixture: ComponentFixture<CampanhaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampanhaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampanhaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
