import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { FormComponent } from './customers/form/form.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { LoginComponent } from './usuarios/login.component';
import { RoleGuard } from './usuarios/guards/role.guard';

const routes:Routes =[

  {path: '', component: CustomersComponent},
  {path: 'clientes', component: CustomersComponent},
  {path: 'clientes/form', component:FormComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'clientes/page/:page', component:CustomersComponent},
  {path: 'clientes/form/:id', component:FormComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'login', component: LoginComponent},
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
