import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerroMuertoComponent } from './perro-muerto.component';

describe('PerroMuertoComponent', () => {
  let component: PerroMuertoComponent;
  let fixture: ComponentFixture<PerroMuertoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerroMuertoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerroMuertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
