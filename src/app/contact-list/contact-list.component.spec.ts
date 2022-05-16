import { HttpClientModule } from '@angular/common/http';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { ContactService } from '../contact.service';

import { ContactListComponent } from './contact-list.component';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let contactService: ContactService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactListComponent ],
      imports: [FormsModule, HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    contactService = TestBed.inject(ContactService);
    fixture.detectChanges();
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  it('should call delete method', () => {
    component.contactList = [{
      "firstName": "Amit",
      "lastName": "Roy",
      "phone": "9876543210",
      "id": 1
    }];
    spyOn(component, 'delete').and.callThrough();
    component.delete(1);
    expect(component.delete).toHaveBeenCalled();
    expect(component.contactList.length).toBe(0);
  });

  it('should call contactService service', () => {
    let contactListData = [
      {
        "firstName": "Amit",
        "lastName": "Roy",
        "phone": "9876543210",
        "id": 1
      },
      {
        "firstName": "Aakash",
        "lastName": "Choudhury",
        "phone": "9876584431",
        "id": 2
      },
      {
        "firstName": "Arun",
        "lastName": "Dey",
        "phone": "5748493812",
        "id": 3
      },
      {
        "firstName": "Vikash",
        "lastName": "Trivedi",
        "phone": "9873625261",
        "id": 4
      },
      {
        "firstName": "Gaurav",
        "lastName": "Gupta",
        "phone": "7002873284",
        "id": 5
      }
    ]
    spyOn(contactService, 'getContactList').and.returnValue(of(contactListData))
    component.ngOnInit();
    expect(contactService.getContactList).toHaveBeenCalled();
    expect(component.contactList.length).toBe(5);
  });

  it('should call onSubmit method when form is valid', () => {
    component.contactList = [{
        "firstName": "Gaurav",
        "lastName": "Gupta",
        "phone": "7002873284",
        "id": 5
      }];
    spyOn(component, 'onSubmit').and.callThrough();
    component.form.controls.id = 5;
    component.form.controls.firstName = 'Gaurav';
    component.form.controls.lastName = 'Gupta';
    component.form.controls.phone = '7002873284';
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });

});