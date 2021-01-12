import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressbookService } from 'src/app/services/addressbook.service';

@Component({
  selector: 'app-addressbook-form',
  templateUrl: './addressbook-form.component.html',
  styleUrls: ['./addressbook-form.component.scss']
})
export class AddressbookFormComponent implements OnInit {
  addressForm : any;
  id:number;
  isUpdate=false;
  constructor(private formBuilder: FormBuilder,
    private addressbookService:AddressbookService, private router:Router,
    private activatedRoute:ActivatedRoute) { 
      this.addressForm=this.formBuilder.group({
        name:['',[Validators.required,Validators.pattern('^^[A-Z][a-z]{2,}\\s[A-Z][a-z]{2,}$')]],
        phoneNumber:['',[Validators.required,Validators.pattern('^[7-9]{1}[0-9]{9}$')]],
        address:['',[Validators.required,Validators.pattern('^(?=.*\\s)(?=.*[,])[A-Za-z0-9]{3,}[A-Za-z0-9\\s,]{1,}$')]],
        city:['',Validators.required],
        state:['',Validators.required],
        zip:['',[Validators.required,Validators.pattern('^[1-9]{1}[0-9]{5}$')]],
        addressBookId:['']
      });
    }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      const newId= +params.get('id');
      if(newId >1){
              this.isUpdate=true;
              this.getDataById(newId);
            }
    });
  }

  private markFormGroupTouched(formGroup:FormGroup){
    (<any>Object).values(formGroup.controls).forEach(control =>{
      control.markAsTouched();
      if(control.controls){
        this.markFormGroupTouched(control);
      }
    });
  }
  
  getDataById(addressBookId:number):void{
    this.addressbookService.getAddressBookData(addressBookId).subscribe(data =>{
    console.log("data of employee",data);

    this.id=data.data.addressBookId;
    this.addressForm.controls['name'].setValue(data.data.name);
    this.addressForm.controls['phoneNumber'].setValue(data.data.phoneNumber);
    this.addressForm.controls['address'].setValue(data.data.address);
    this.addressForm.controls['city'].setValue(data.data.city);
    this.addressForm.controls['state'].setValue(data.data.state);
    this.addressForm.controls['zip'].setValue(data.data.zip);

    });
  }

  save(event){
    event.preventDefault();
    console.log("save");
    console.log(this.addressForm.value);

    if(this.addressForm.valid){

      if(this.isUpdate){
        this.addressForm.controls['addressBookId'].setValue(this.id);
        this.addressbookService.updateAddressBook(this.addressForm.value).subscribe(response =>{
          console.log("response is ",response);
          this.router.navigateByUrl('')
        },err =>{
        })
      }else{
        this.addressbookService.addAddressBook(this.addressForm.value).subscribe(response =>{
          console.log("response is ",response);
          this.router.navigateByUrl('')
        },err =>{
        })
      }
    }else{
      this.markFormGroupTouched(this.addressForm);
    }
  }
}
