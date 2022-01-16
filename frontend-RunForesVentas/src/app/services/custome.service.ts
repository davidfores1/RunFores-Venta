import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Customer } from '../models/customer';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CustomeService {

  private httpHeaders = new HttpHeaders({'content-Type': 'application/json'})
  private routeCliente = "/clientes/";
  
  constructor(private http: HttpClient, private router: Router) { }

  getCustomers():Observable<Customer[]>{
    //return of(CUSTOMERS);
    return this.http.get(environment.apiUrl + this.routeCliente).pipe(
      map(response =>{
        let customers = response as Customer[];
        return customers.map(customer =>{
          customer.createAt = formatDate(customer.createAt, 'short', 'en-US')
          return customer;
        });
      })
    )
  }

  getCustomer(id: any):Observable<Customer>{
    return this.http.get<Customer>(`${environment.apiUrl}${this.routeCliente}${id}`).pipe(
      catchError(e =>{
        this.router.navigate(['/clientes']);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  create(customer:Customer):Observable<any>{
    return this.http.post<any>(environment.apiUrl + this.routeCliente, customer,{headers: this.httpHeaders}).pipe(
      catchError(e => {

        if(e.status == 400){
          return throwError(e);
        }
        
        Swal.fire('Error al crear al cliente', e.error.mensaje, 'error');
        return throwError(e);
        
      })
    );
  }

  update(customer: Customer): Observable<any>{
    return this.http.put<any>(`${environment.apiUrl}${this.routeCliente}${customer.id}`, customer,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        
        if(e.status == 400){
          return throwError(e);
        }
        
        Swal.fire('Error al editar al cliente', e.error.mensaje, 'error');
        return throwError(e);
        
      })
    );
  }

  delete(id:number):Observable<Customer>{
    return this.http.delete<Customer>(`${environment.apiUrl}${this.routeCliente}${id}`,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        
        Swal.fire('Error al eliminar al cliente', e.error.mensaje, 'error');
        return throwError(e);
        
      })
    );
  }

}
