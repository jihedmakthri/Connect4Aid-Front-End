import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventstatComponent } from './eventstat.component';

describe('EventstatComponent', () => {
  let component: EventstatComponent;
  let fixture: ComponentFixture<EventstatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventstatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
