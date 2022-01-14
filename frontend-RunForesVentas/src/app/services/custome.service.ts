import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customer } from '../models/customer';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomeService {

  private httpHeaders = new HttpHeaders({'content-Type': 'application/json'})
  private routeCliente = "/clientes/";
  
  constructor(private http: HttpClient, private router: Router) { }

  getCustomers():Observable<Customer[]>{
    //return of(CUSTOMERS);
    return this.http.get<Customer[]>(environment.apiUrl + this.routeCliente)
  }

  create(customer:Customer):Observable<any>{
    return this.http.post<any>(environment.apiUrl + this.routeCliente, customer,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        
        Swal.fire('Error al crear al cliente', e.error.mensaje, 'error');
        return throwError(e);
        
      })
    );
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

  update(customer: Customer): Observable<any>{
    return this.http.put<any>(`${environment.apiUrl}${this.routeCliente}${customer.id}`, customer,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        
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
