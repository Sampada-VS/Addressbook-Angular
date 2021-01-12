import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressbookFormComponent } from './addressbook-form.component';

describe('AddressbookFormComponent', () => {
  let component: AddressbookFormComponent;
  let fixture: ComponentFixture<AddressbookFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressbookFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressbookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
