import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';
// import a from '../../assets/data/user.json'
import _, { map } from 'underscore';
import { ModalController,AlertController } from '@ionic/angular';
import { ModalPageComponent } from '../modal-page/modal-page.component';
import { SMS } from '@ionic-native/sms/ngx';
// import { AndroidPermissions } from '@ionic-native/android-permissions/ngx/index';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})

export class FolderPage implements OnInit {
  public folder: string;
  item$: Observable<any[]>;


  constructor(private activatedRoute: ActivatedRoute,
    public firestore: AngularFirestore,
    public fsvc: FirebaseService,
    public modalController: ModalController,
    private sms: SMS,
    // public androidPermissions: AndroidPermissions,
    private alertCtrl: AlertController) {
    // this.item$ = firestore.collection('items').valueChanges();
    // console.log(this.item$, firestore.collection('items'));
    // console.log(a);
    this.item$ = this.fsvc.getDataQuery('items', ref => ref.orderBy('name'));

  }

  ngOnInit() {
    // this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.folder = 'Gym Status';
    // this.userData.forEach(data=>{
    //   this.addData(data);
    // })
    // this.requestSMSPermission();

  }
  async presentAlert(msg) {
    let alert = await this.alertCtrl.create({
      header: msg,
      message: '8867515162',
      buttons: ['Dismiss']
    });
    await alert.present();
  }
  // checkSMSPermission() {
  //   this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
  //     result => console.log('Has permission?', result.hasPermission),
  //     err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS)
  //   );
  // }
  // requestSMSPermission() {
  //   // tslint:disable-next-line: max-line-length
  //   this.androidPermissions.requestPermissions
  //   ([this.androidPermissions.PERMISSION.SEND_SMS, this.androidPermissions.PERMISSION.BROADCAST_SMS]);
  // }
  sendIndividualMsg() {
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
    .then(data=>{
      this.presentAlert('the sms is sent');
    }).catch(err=>{
      this.presentAlert('the sms is Not sent '+err);
    });
  }
  async presentModal() {
    // let eventEmitter= new EventEmitter();
    // eventEmitter.subscribe(res=>{
    //   // console.log("emitterResult", res);
    //   dismiss()
    // });
    const modal = await this.modalController.create({
      component: ModalPageComponent,
      cssClass: 'my-custom-class',
      // componentProps: {
      //   clickFavorite: eventEmitter
      // }
      swipeToClose: true,
    });
    return await modal.present();
  }
  // dismiss() {
  //   // using the injected ModalController this page
  //   // can "dismiss" itself and optionally pass back data
  //   this.modalController.dismiss({
  //     'dismissed': true
  //   });
  // }
  addData(data) {
    this.fsvc.setData('items', data);
  }
  getDate(date) {
    return date;
  }

}
