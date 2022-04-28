import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  logout():void{

    Swal.fire('Logout', `Hola ${this.authService.usuario.username}, has cerrado sesion con éxito`, 'success');
    this.authService.logoutService();
    this.router.navigate(['/login'])

  }

}
