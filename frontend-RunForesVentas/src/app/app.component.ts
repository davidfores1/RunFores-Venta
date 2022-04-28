import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RunFores';

  usuarioLogin:boolean = false;

  constructor(public authService:AuthService){}

  ngOnInit(): void {

    // if(sessionStorage.getItem('token')){
    //   this.usuarioLogin = true;
    // }

  }

}
