import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaModalEliminarPerroComponent } from './ventana-modal-eliminar-perro.component';

describe('VentanaModalEliminarPerroComponent', () => {
  let component: VentanaModalEliminarPerroComponent;
  let fixture: ComponentFixture<VentanaModalEliminarPerroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentanaModalEliminarPerroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentanaModalEliminarPerroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
