import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../models/customer';
import { CustomeService } from '../services/custome.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  customer:Customer = new Customer();
  titulo:string = "Crear Cliente";

  constructor(private customerService: CustomeService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectCustomer()
  }

  selectCustomer(){

  this.activatedRoute.params.subscribe( params =>{
    let id = params['id']
    if(id){
      this.customerService.getCustomer(id).subscribe((respuesta=>{

        this.customer = respuesta;
      }))
    }
  })

  }

  public createCustomer():void{

    this.customerService.create(this.customer).subscribe(
      Response =>{
        this.router.navigate(['/clientes'])
        Swal.fire(
          'Nuevo Cliente!',
          `${Response.name} creado con éxito`, 'success'
        )
      } 
    )
    

  }

}
