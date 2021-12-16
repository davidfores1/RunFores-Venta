import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CUSTOMERS } from '../customers/customers.json';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomeService {

  constructor() { }

  getCustomer():Observable<Customer[]>{
    return of(CUSTOMERS);
  }
}
