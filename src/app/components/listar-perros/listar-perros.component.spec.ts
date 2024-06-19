import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPerrosComponent } from './listar-perros.component';

describe('ListarPerrosComponent', () => {
  let component: ListarPerrosComponent;
  let fixture: ComponentFixture<ListarPerrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarPerrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPerrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
