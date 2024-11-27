import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampanhaListComponent } from './campanha-list.component';

describe('CampanhaListComponent', () => {
  let component: CampanhaListComponent;
  let fixture: ComponentFixture<CampanhaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampanhaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampanhaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
