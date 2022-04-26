import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule } from '@angular/material-moment-adapter';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { CustomersComponent } from './customers/customers.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { FormComponent } from './customers/form/form.component'
import { DetailComponent } from './customers/detail/detail.component';
import { LoginComponent } from './usuarios/login.component';

import { CustomeService } from './services/custome.service';



 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CustomersComponent,
    FormComponent,
    PaginatorComponent,
    DetailComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
    MatDatepickerModule, MatMomentDateModule
  ],
  providers: [CustomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
