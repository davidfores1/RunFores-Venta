import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal:boolean = false;

  constructor() { }

  openModalService(){
    this.modal = true;  
  }

  closeModalService(){
    this.modal = false;
  }
}
