import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCandidatureComponent } from './dialog-candidature.component';

describe('DialogCandidatureComponent', () => {
  let component: DialogCandidatureComponent;
  let fixture: ComponentFixture<DialogCandidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCandidatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
