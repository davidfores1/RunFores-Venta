import { HttpHeaders } from "@angular/common/http";

const credenciales = btoa('angularapp' + ':' + '12345');
const httpHeaders = new HttpHeaders({ 'content-Type': 'application/json' });
const httpHeaders2 = new HttpHeaders({ 'content-Type': 'application/x-www-form-urlencoded', 
                                       'Authorization' : 'Basic ' + credenciales });


export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  apiUrlAuth: 'http://localhost:8080/oauth/token',
  httpHeaders,
  httpHeaders2
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
