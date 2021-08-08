import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AlertService } from './service/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  item$: Observable<any[]>;
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(firestore: AngularFirestore,private androidPermissions: AndroidPermissions,
    private alertSvc: AlertService) {
    this.item$ = firestore.collection('items').valueChanges();
    console.log(this.item$,firestore.collection('items') );
    this.initApp();
  }
  initApp() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
      (result) => {
        console.log('Has permission?', result.hasPermission);
        this.alertSvc.alert("success"+JSON.stringify(result));
      }
    ).catch((err) => {
      this.alertSvc.alert("error"+err+this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS));
      this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS);
    });
  }
}
