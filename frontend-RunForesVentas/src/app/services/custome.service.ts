import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CUSTOMERS } from '../customers/customers.json';
import { Customer } from '../models/customer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomeService {

  constructor(private http: HttpClient) { }

  getCustomer():Observable<Customer[]>{
    //return of(CUSTOMERS);
    return this.http.get<Customer[]>(environment.apiUrl + '/clientes')
  }
}
