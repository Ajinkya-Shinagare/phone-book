import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  CONTACTS_URL = 'https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts';

  constructor(private http: HttpClient) { }

  getContactList(){
    return this.http.get(this.CONTACTS_URL);
  }

}
