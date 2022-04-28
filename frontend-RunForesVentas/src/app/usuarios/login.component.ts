import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from './usuario';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario!:Usuario;

  constructor(private authService:AuthService, private router: Router) { 
    this.usuario = new Usuario();
  }

  ngOnInit(): void {

  }

  login(): void{

    if(this.usuario.username == null || this.usuario.password == null){
      Swal.fire('Error Login', 'Usuario o password vacias!', 'error');
      return;
    }

    this.authService.loginService(this.usuario).subscribe(response =>{

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      
      let Usuario = this.authService.usuario;
      this.router.navigate(['/clientes']);
      Swal.fire('Login', `Hola ${Usuario.username}, has iniciado sesión con éxito!`, 'success')
      
    }, err =>{
      if(err.status == 400){
        Swal.fire('Error Login', 'Usuario o password incorrectas!!', 'error');
      }
    })
    
  }

}
