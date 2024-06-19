import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerroAdoptadoComponent } from './perro-adoptado.component';

describe('PerroAdoptadoComponent', () => {
  let component: PerroAdoptadoComponent;
  let fixture: ComponentFixture<PerroAdoptadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerroAdoptadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerroAdoptadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
