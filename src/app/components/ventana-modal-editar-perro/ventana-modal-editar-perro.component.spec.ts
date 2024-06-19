import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaModalEditarPerroComponent } from './ventana-modal-editar-perro.component';

describe('VentanaModalEditarPerroComponent', () => {
  let component: VentanaModalEditarPerroComponent;
  let fixture: ComponentFixture<VentanaModalEditarPerroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentanaModalEditarPerroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentanaModalEditarPerroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
