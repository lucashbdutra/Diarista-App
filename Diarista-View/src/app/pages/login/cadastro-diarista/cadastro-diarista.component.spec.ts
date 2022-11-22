import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDiaristaComponent } from './cadastro-diarista.component';

describe('CadastroDiaristaComponent', () => {
  let component: CadastroDiaristaComponent;
  let fixture: ComponentFixture<CadastroDiaristaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroDiaristaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroDiaristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
