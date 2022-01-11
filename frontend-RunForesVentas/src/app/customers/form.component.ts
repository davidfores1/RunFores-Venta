import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../models/customer';
import { CustomeService } from '../services/custome.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  customer:Customer = new Customer();
  titulo:string = "Crear Cliente";

  constructor(private customerService: CustomeService, private router: Router) { }

  ngOnInit(): void {
  }

  public create():void{

    this.customerService.create(this.customer).subscribe(
      Response =>{
        this.router.navigate(['/clientes'])
      } 
    )
    

  }

}
