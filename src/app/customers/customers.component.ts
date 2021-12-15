import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CUSTOMERS } from './customers.json';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

customers!: Customer[];

  constructor() { }

  ngOnInit(): void {

    this.customers = CUSTOMERS;
    
  }

}
