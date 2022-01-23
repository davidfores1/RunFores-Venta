import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomeService } from 'src/app/services/custome.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  title:string = "Detalle del cliente";
  customer!: Customer;

  constructor(public customerService: CustomeService, private activatedRote:ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRote.paramMap.subscribe(params =>{
      
      let id:number = +params.get('id')! | 0; 
      if(id){
        this.customerService.getCustomer(id).subscribe(customer=>{

          this.customer = customer;

        }) 
      }
    })
  }

}
