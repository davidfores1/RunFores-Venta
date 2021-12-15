import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

customers: Customer[] = [

  {id:1, name:"Carlos", lastName:"Canicas", email:"david77@hotmail.com",createAt:"14-12-2021"},
  {id:2, name:"Felipe", lastName:"Perez", email:"Perez@hotmail.com",createAt:"14-12-2021"}

];

  constructor() { }

  ngOnInit(): void {
  }

}
