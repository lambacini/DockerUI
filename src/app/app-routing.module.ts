import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainersComponent } from './containers/containers.component';
import { VolumesComponent } from './volumes/volumes.component';
import { NetworksComponent } from './networks/networks.component';
import { ImagesComponent } from './images/images.component';
import { ContainerlogsComponent } from './containerlogs/containerlogs.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  {
    path: 'Home',
    component: HomeComponent,
  },
  {
    path: 'Containers',
    component: ContainersComponent,
  },
  {
    path: 'Containers/:id',
    component: ContainerlogsComponent,
  },
  {
    path: 'Volumes',
    component: VolumesComponent,
  },
  {
    path: 'Networks',
    component: NetworksComponent,
  },
  {
    path: 'Images',
    component: ImagesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
