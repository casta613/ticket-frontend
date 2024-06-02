import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaTicketComponent } from './plantilla-ticket.component';

describe('PlantillaTicketComponent', () => {
  let component: PlantillaTicketComponent;
  let fixture: ComponentFixture<PlantillaTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlantillaTicketComponent]
    });
    fixture = TestBed.createComponent(PlantillaTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
