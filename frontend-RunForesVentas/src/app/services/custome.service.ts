import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CUSTOMERS } from '../customers/customers.json';
import { Customer } from '../models/customer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomeService {

  private httpHeaders = new HttpHeaders({'content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getCustomer():Observable<Customer[]>{
    //return of(CUSTOMERS);
    return this.http.get<Customer[]>(environment.apiUrl + '/clientes')
  }

  create(customer:Customer):Observable<Customer>{
    return this.http.post<Customer>(environment.apiUrl + '/clientes', customer,{headers: this.httpHeaders});
  }
}
