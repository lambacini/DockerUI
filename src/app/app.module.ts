import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContainersComponent } from './containers/containers.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { VolumesComponent } from './volumes/volumes.component';
import { NetworksComponent } from './networks/networks.component';
import { ImagesComponent } from './images/images.component';
import { ApploadingComponent } from './shared/apploading/apploading.component';
import { ContainerlogsComponent } from './containerlogs/containerlogs.component';
import { HomeComponent } from './home/home.component';
import { VpnclientComponent } from './vpnclient/vpnclient.component';
import { ContainerdetailComponent } from './containerdetail/containerdetail.component';
import { TerminalComponent } from './terminal/terminal.component';
import { NgTerminalModule } from 'ng-terminal';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { InfocardComponent } from './infocard/infocard.component';

@NgModule({
  declarations: [AppComponent, ContainersComponent, VolumesComponent, NetworksComponent, ImagesComponent, ApploadingComponent, ContainerlogsComponent, HomeComponent, VpnclientComponent, ContainerdetailComponent, TerminalComponent, SearchComponent, InfocardComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ClarityModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    NgTerminalModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
