import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPerroComponent } from './crear-perro.component';

describe('CrearPerroComponent', () => {
  let component: CrearPerroComponent;
  let fixture: ComponentFixture<CrearPerroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPerroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPerroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
