import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import _, { map } from 'underscore';
import { ModalController, AlertController } from '@ionic/angular';
import { ModalPageComponent } from '../modal-page/modal-page.component';
import { SMS } from '@ionic-native/sms/ngx';
import { MessageService } from '../service/message.service';
import { DataService } from '../service/data.service';
// import { AndroidPermissions } from '@ionic-native/android-permissions/ngx/index';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})

export class FolderPage implements OnInit {
  public folder: string;
  item$: Observable<any[]>;
  public myArray: any = [];

  constructor(private activatedRoute: ActivatedRoute,
    public firestore: AngularFirestore,
    public fsvc: FirebaseService,
    public modalController: ModalController,
    private sms: SMS,
    private alertCtrl: AlertController,
    private msgSvc: MessageService,
    public data: DataService,
    // public androidPermissions: AndroidPermissions,
) {
    // this.item$ = firestore.collection('items').valueChanges();
    // console.log(this.item$, firestore.collection('items'));
    // console.log(a);
    this.item$ = this.fsvc.getDataQuery('items', ref => ref.orderBy('name'));

    this.firestore
      .collection('items')
      .get()
      .subscribe((ss) => {
        ss.docs.forEach((doc) => {
          this.myArray.push(doc.data());
        });

        this.data.data = this.myArray;
        console.log('items', this.myArray, this.data);
      });



  }

  ngOnInit() {
    // this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.folder = 'Gym Status';
    // this.msgSvc.sendWhatsAppText();

  }
  async presentAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: msg,
      message: '8867515162',
      buttons: ['Dismiss']
    });
    await alert.present();
  }
  sendIndividualMsg() {
    this.msgSvc.sendTextSms('8867515162','hi').subscribe(data=>{
      this.presentAlert('the sms is sent');
    },(err=>{
      this.presentAlert('the sms is Not sent '+err);
    }));
  }
  async presentModal() {
    // this.checkSMSPermission();
    // CONFIGURATION
    const options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: ''  // send SMS with the native android SMS messaging
        // intent: '' // send SMS without opening any other app
      }
    };
    this.sms.send('9449058230', 'Hello amma this is a test message', options)
      .then(data => {
        this.presentAlert('the sms is sent');
      }).catch(err => {
        this.presentAlert('the sms is Not sent ' + err);
      });
  }
  // dismiss() {
  //   // using the injected ModalController this page
  //   // can 'dismiss' itself and optionally pass back data
  //   this.modalController.dismiss({
  //     'dismissed': true
  //   });
  // }
  addData(data) {
    this.fsvc.setData('items', data);
  }
  getDate(date) {
    if (new Date(date) && date !== '') {
      return new Date(date);
    } else { return date; }
  }

}
