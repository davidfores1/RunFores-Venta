import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../models/customer';
import { CustomeService } from '../services/custome.service';
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  customer: Customer = new Customer();
  titulo: string = "Crear Cliente";

  errores!: string[]

  constructor(private customerService: CustomeService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.selectCustomer()
  }

  selectCustomer() {

    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.customerService.getCustomer(id).subscribe((respuesta => {

          this.customer = respuesta;
        }))
      }
    })

  }

  public createCustomer(): void {

    this.customerService.create(this.customer).subscribe(
      response => {
        this.router.navigate(['/clientes'])
        Swal.fire(
          'Nuevo Cliente!',
          `${response.mensaje}: ${response.customer.name}`, 'success'
        )
      },
      err => {

        if (err.status == 400) {

          this.errores = err.error.error as string[];

          this.errores.forEach(er => {

            this.toastr.error(JSON.stringify(er), JSON.stringify(err.status), {
              //positionClass:'toast-top-center',
              timeOut: 6000,
              progressBar: true
            });

          })
        }
      }
    )

  }

  updateCustomer(): void {
    this.customerService.update(this.customer).subscribe(response => {
      this.router.navigate(['/clientes'])
      Swal.fire(
        'Cliente Actualizado!',
        `${response.mensaje}: ${response.customer.name}`, 'success'
      )
    },
      err => {

        if (err.status == 400) {

          this.errores = err.error.error as string[];

          this.errores.forEach(er => {

            this.toastr.error(JSON.stringify(er), JSON.stringify(err.status), {
              //positionClass:'toast-top-center',
              timeOut: 6000,
              progressBar: true
            });

          })
        }

      }
    )
  }

}
