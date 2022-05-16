import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ContactService } from '../contact.service';
import { Contact } from '../model/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contactList: Contact[] = [];
  alreadyAdded = false;
  addedSuccessfully = false;
  loading = false;

  @ViewChild('form') form: any;


  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.loading = false;
    this.contactService.getContactList().subscribe((phoneBookList:any)=>{
      this.contactList = phoneBookList;
      this.loading = true;
    })
  }


  onSubmit() {
    if(this.form.invalid){
      this.form.control.markAllAsTouched();
    }else{
      let firstName = this.form.controls.firstName.value;
      let lastName = this.form.controls.lastName.value;
      let phone = this.form.controls.phone.value;
      let id = this.contactList.length + 1;

      let matchedFirstName = this.contactList.filter((item) => item.firstName === firstName);
      let matchedLastName = this.contactList.filter((item) => item.lastName === lastName);
      let matchedPhone = this.contactList.filter((item) => item.phone === phone);
      //check for contact details already added or not
      if((matchedFirstName.length < 1) || (matchedLastName.length < 1) || (matchedPhone.length < 1)){
        this.alreadyAdded = false;
        this.addedSuccessfully = true;
        this.contactList.push({
          firstName, lastName, phone, id
        })
      }else{
        this.alreadyAdded = true;
        this.addedSuccessfully = false;
      }

    }
  }

  edit(id:any){
    let matchedContact = this.contactList.filter((item) => item.id === id);
    this.form.setValue(matchedContact[0]);
  }

  delete(id:number){
    const removeIndex = this.contactList.findIndex( item => item.id === id );
    this.contactList.splice( removeIndex, 1 );
  }
}
