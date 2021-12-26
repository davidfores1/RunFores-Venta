import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomeService } from '../services/custome.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

customers!: Customer[];

  constructor(private customeService:CustomeService) { }

  ngOnInit(): void {

    this.customeService.getCustomer().subscribe(
      (customers)=>{ 
        this.customers = customers
      } 
    );
    
  }

}
