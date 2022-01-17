import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Customer } from '../models/customer';
import { CustomeService } from '../services/custome.service';



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers!: Customer[];
  paginator:any;

  constructor(private customeService: CustomeService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page')! | 0;

      if (!page) {
        page = 0;
      }

      this.customeService.getCustomers(page).subscribe(
        (response) => {
          this.customers = response.content as Customer[];
          this.paginator = response; 
        });

    });

  }

  deleteCustomer(customer: Customer): void {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    Swal.fire({
      title: 'Esta seguro?',
      text: `Desea eliminar al cliente ${customer.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.customeService.delete(customer.id).subscribe(response => {

          this.customers = this.customers.filter(cli => cli !== customer)

          swalWithBootstrapButtons.fire(
            'Cliente eliminado!',
            `Cliente ${customer.name} eliminado con éxito`,
            'success'
          )

        })

      }
    })

  }

}
