import { Injectable } from '@angular/core';
import { CUSTOMERS } from '../customers/customers.json';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomeService {

  constructor() { }

  getCustomer():Customer[]{
    return CUSTOMERS;
  }
}
