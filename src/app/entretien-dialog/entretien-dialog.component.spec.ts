import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntretienDialogComponent } from './entretien-dialog.component';

describe('EntretienDialogComponent', () => {
  let component: EntretienDialogComponent;
  let fixture: ComponentFixture<EntretienDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntretienDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntretienDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
