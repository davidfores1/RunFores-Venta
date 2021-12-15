import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomeService } from './services/custome.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CustomersComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [CustomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
