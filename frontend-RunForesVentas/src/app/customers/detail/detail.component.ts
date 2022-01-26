import { HttpEventType } from '@angular/common/http';
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
  selectPhotoVariable!: any;
  customer!: Customer;
  progress: number = 0;

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

    this.progress = 0;
    console.log(this.progress);
    
    this.selectPhotoVariable = event.target.files[0];

    if(this.selectPhotoVariable.type.indexOf('image') < 0){

      Swal.fire('Error, selecionar imagen: ','El archivo debe ser del tipo imagen', 'error');
      this.selectPhotoVariable = null;
        
    }

  }

  uploadPhotoComponet() {

    if(!this.selectPhotoVariable){

      Swal.fire('Error Upload: ','Debe seleccionar una foto', 'error');
      
    }else{

      this.customerService.uploadPhoto(this.selectPhotoVariable, this.customer.id)
      .subscribe(event=>{
        
        if(event.type === HttpEventType.UploadProgress){
          this.progress = Math.round(100 * event.loaded / (event.total ?? 0));
        }else if(event.type === HttpEventType.Response){
          let response : any = event.body;
          this.customer = response.customer as Customer;
          
          Swal.fire(
            'La foto se ha subido completamente!',
            `La foto se ha subido con éxito ${response.mensaje}`, 'success'
          )

        }  
  
      })

    }  

  }


}
