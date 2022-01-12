import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { FormComponent } from './customers/form.component';

const routes:Routes =[

  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'clientes', component: CustomersComponent},
  {path: 'clientes/form', component:FormComponent},
  {path: 'clientes/form/:id', component:FormComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
