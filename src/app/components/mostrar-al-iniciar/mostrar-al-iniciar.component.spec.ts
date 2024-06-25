import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarAlIniciarComponent } from './mostrar-al-iniciar.component';

describe('MostrarAlIniciarComponent', () => {
  let component: MostrarAlIniciarComponent;
  let fixture: ComponentFixture<MostrarAlIniciarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarAlIniciarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarAlIniciarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
