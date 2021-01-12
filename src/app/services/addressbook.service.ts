import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressbookService {

  constructor(private http:HttpClient) { }

  getAllAddressBook():Observable<any>{
    return this.http.get<any>('http://localhost:8080/addressbookservice/get');
  }
  getAddressBookData(addressBookId:any):Observable<any>{
    return this.http.get<any>('http://localhost:8080/addressbookservice/get/'+addressBookId);
  }
  deleteAddressBook(addressBookId:any):Observable<any>{
    return this.http.delete('http://localhost:8080/addressbookservice/delete/'+addressBookId);
  }
  addAddressBook(data:any):Observable<any>{
    return this.http.post('http://localhost:8080/addressbookservice/create/',data);
  }
  updateAddressBook(data:any){
    var id=data.addressBookId;
    return this.http.put('http://localhost:8080/addressbookservice/update/'+id,data);
  }
}
