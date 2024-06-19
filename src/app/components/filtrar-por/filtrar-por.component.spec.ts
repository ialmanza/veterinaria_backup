import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrarPorComponent } from './filtrar-por.component';

describe('FiltrarPorComponent', () => {
  let component: FiltrarPorComponent;
  let fixture: ComponentFixture<FiltrarPorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrarPorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltrarPorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
