import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainersComponent } from './containers/containers.component';


const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  {
    path:'Home',
    component:ContainersComponent
  },
  {
    path:'Containers',
    component:ContainersComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
