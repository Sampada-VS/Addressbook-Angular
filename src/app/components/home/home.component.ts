import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressbookService } from 'src/app/services/addressbook.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  addressBookArray:any[]=[];
  addressbookEvent=new EventEmitter();

  constructor(private addressbookService:AddressbookService,private router:Router) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData(){
    this.getAllAddressBookData();
  }

  getAllAddressBookData(){
    this.addressbookService.getAllAddressBook().subscribe(response =>{
      this.addressBookArray=response.data;
      console.log(this.addressBookArray);
    });
  }

  remove(addressBookId:number){
    this.addressbookService.deleteAddressBook(addressBookId).subscribe(data => {
      this.addressbookEvent.emit({type:'delete',data:{}});
      this.reloadData();
    },err =>{
    })
  }
  update(addressBookId:number){
    console.log(addressBookId);
    this.router.navigateByUrl(`form/${addressBookId}`);
  }
}
