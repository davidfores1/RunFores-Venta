import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RunFores';

  usuarioLogin:boolean = false;

  ngOnInit(): void {

    // if(sessionStorage.getItem('token')){
    //   this.usuarioLogin = true;
    // }

  }

}
