import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomeService } from 'src/app/services/custome.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  title: string = "Detalle del cliente";
  selectPhotoVariable!: any;
  @Input() customer!: Customer;
  progress: number = 0;

  constructor(public customerService: CustomeService, public modalService:ModalService) { }

  ngOnInit(): void {

    
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
          this.modalService.notificarUpload.emit(this.customer);
          Swal.fire(
            'La foto se ha subido completamente!',
            `La foto se ha subido con éxito ${response.mensaje}`, 'success'
          )

        }  
  
      })

    }  

  }


closeModal(){
  this.modalService.closeModalService();
  this.selectPhotoVariable = null;
  this.progress = 0;
}

}
