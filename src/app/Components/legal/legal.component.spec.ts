import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LegalComponent } from './legal.component';

describe('LegalComponent', () => {
  let component: LegalComponent;
  let fixture: ComponentFixture<LegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of([{type: 'terms'}]),
          },
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
