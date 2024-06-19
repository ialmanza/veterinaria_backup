import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparaPesoComponent } from './compara-peso.component';

describe('ComparaPesoComponent', () => {
  let component: ComparaPesoComponent;
  let fixture: ComponentFixture<ComparaPesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparaPesoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparaPesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
