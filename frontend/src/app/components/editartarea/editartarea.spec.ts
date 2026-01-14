import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editartarea } from './editartarea';

describe('Editartarea', () => {
  let component: Editartarea;
  let fixture: ComponentFixture<Editartarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editartarea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editartarea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
