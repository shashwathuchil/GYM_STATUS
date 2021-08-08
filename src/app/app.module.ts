import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ModalPageComponent } from './modal-page/modal-page.component';

import { SMS } from '@ionic-native/sms/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AlertService } from './service/alert.service';

@NgModule({
  declarations: [AppComponent,SideBarComponent, ModalPageComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(environment.firebase)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },SMS,AndroidPermissions,AlertService],
  bootstrap: [AppComponent],
})
export class AppModule {}
