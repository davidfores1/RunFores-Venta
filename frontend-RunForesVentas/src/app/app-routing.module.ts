import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { FormComponent } from './customers/form/form.component';

const routes:Routes =[

  {path: '', component: CustomersComponent},
  {path: 'clientes', component: CustomersComponent},
  {path: 'clientes/form', component:FormComponent},
  {path: 'clientes/page/:page', component:CustomersComponent},
  {path: 'clientes/form/:id', component:FormComponent},
  {
    path: '**',
    redirectTo: 'clientes'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
