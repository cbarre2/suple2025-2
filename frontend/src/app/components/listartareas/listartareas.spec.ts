import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listartareas } from './listartareas';

describe('Listartareas', () => {
  let component: Listartareas;
  let fixture: ComponentFixture<Listartareas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Listartareas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listartareas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
