import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario!:Usuario;

  constructor() { 
    this.usuario = new Usuario();
  }

  ngOnInit(): void {

  }

  login(): void{

    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null){
      Swal.fire('Error Login', 'Usuario o password vacias!', 'error')
      return;
    }
    
  }

}
