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
  private routeCliente = "/clientes/";
  
  constructor(private http: HttpClient) { }

  getCustomers():Observable<Customer[]>{
    //return of(CUSTOMERS);
    return this.http.get<Customer[]>(environment.apiUrl + this.routeCliente)
  }

  create(customer:Customer):Observable<Customer>{
    return this.http.post<Customer>(environment.apiUrl + this.routeCliente, customer,{headers: this.httpHeaders});
  }

  getCustomer(id: any):Observable<Customer>{
    return this.http.get<Customer>(`${environment.apiUrl}${this.routeCliente}${id}`)
  }

}
