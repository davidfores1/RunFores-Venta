import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomeService } from 'src/app/services/custome.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  title: string = "Detalle del cliente";
  private selectPhotoVariable!: File;
  customer!: Customer;

  constructor(public customerService: CustomeService, private activatedRote: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRote.paramMap.subscribe(params => {

      let id: number = +params.get('id')! | 0;
      if (id) {
        this.customerService.getCustomer(id).subscribe(customer => {

          this.customer = customer;

        })
      }
    })
  }

  selectPhone(event: any) {

    this.selectPhotoVariable = event.target.files[0];
    console.log(this.selectPhotoVariable);


  }

  uploadPhotoComponet() {

    this.customerService.uploadPhoto(this.selectPhotoVariable, this.customer.id)
    .subscribe(customer=>{
      
    this.customer = customer;

    console.log(this.customer);
    

    Swal.fire(
      'La foto se ha subido completamente!',
      `La foto se ha subido con éxito ${this.customer.photo}`, 'success'
    )

    })

  }


}
