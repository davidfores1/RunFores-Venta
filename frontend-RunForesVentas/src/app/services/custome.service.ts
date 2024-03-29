import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Customer } from '../models/customer';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Region } from '../models/region';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomeService {


  private routeCliente = "/clientes/";

  constructor(private http: HttpClient, private router: Router, 
    public authService:AuthService) { }

  private agregarAuthorizationHeader(){

    let token = this.authService.token;
    if(token != null){
      return environment.httpHeaders.append('Authorization', 'bearer ' + token);
    }
      return environment.httpHeaders;
  }

  private isNOAutorizado(e:any): boolean {

    if(e.status == 401){

      if(this.authService.isAuthenticated()){
        this.authService.logoutService();
      }  

      this.router.navigate(['/login'])
      return true;
    }

    if(e.status == 403){
      Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/clientes'])
      return true;
    }

    return false;
  }

  getCustomers(page: number): Observable<any> {
    //return of(CUSTOMERS);
    return this.http.get(environment.apiUrl + this.routeCliente + 'page/' + page).pipe(
      map((response: any) => {

        (response.content as Customer[]).map(customer => {

          //customer.createAt = formatDate(customer.createAt, 'short', 'en-US')
          return customer;
        });
        return response
      })
    )
  }

  getCustomer(id: any): Observable<Customer> {
    return this.http.get<Customer>(`${environment.apiUrl}${this.routeCliente}${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {

        if(this.isNOAutorizado(e)){
          return throwError(e);
        }
    
        this.router.navigate(['/clientes']);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  create(customer: Customer): Observable<any> {
    return this.http.post<any>(environment.apiUrl + this.routeCliente, customer, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {

        if(this.isNOAutorizado(e)){
          return throwError(e);
        }

        if (e.status == 400) {
          return throwError(e);
        }

        Swal.fire('Error al crear al cliente', e.error.mensaje, 'error');
        return throwError(e);

      })
    );
  }

  update(customer: Customer): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}${this.routeCliente}${customer.id}`, customer, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {

        if(this.isNOAutorizado(e)){
          return throwError(e);
        }

        if (e.status == 400) {
          return throwError(e);
        }

        Swal.fire('Error al editar al cliente', e.error.mensaje, 'error');
        return throwError(e);

      })
    );
  }

  delete(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${environment.apiUrl}${this.routeCliente}${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {

        if(this.isNOAutorizado(e)){
          return throwError(e);
        }

        Swal.fire('Error al eliminar al cliente', e.error.mensaje, 'error');
        return throwError(e);

      })
    );
  }

  uploadPhoto(file: File, id: any): Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append("file", file)
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if(token != null){
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    console.log(httpHeaders);
    

    const req = new HttpRequest('POST', `${environment.apiUrl}${this.routeCliente}upload/`, formData, {
      reportProgress: true,
      headers: httpHeaders
    });

    return this.http.request(req).pipe(
      catchError(e => {
        this.isNOAutorizado(e);
        return throwError(e);
      })
    );
  }

  getRegions(): Observable<Region[]> {

    return this.http.get<Region[]>(environment.apiUrl + this.routeCliente + 'regiones', 
                                   {headers: this.agregarAuthorizationHeader()}).pipe(

      catchError(e => {
        this.isNOAutorizado(e);
        return throwError(e);
      })
    );

  }

}
