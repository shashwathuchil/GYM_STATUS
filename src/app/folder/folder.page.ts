import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import _, { map } from 'underscore';
import { ModalController,AlertController } from '@ionic/angular';
import { ModalPageComponent } from '../modal-page/modal-page.component';
import { SMS } from '@ionic-native/sms/ngx';
import { MessageService } from '../service/message.service';

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
    private alertCtrl: AlertController,
    private msgSvc: MessageService) {
    this.item$ = this.fsvc.getDataQuery('items', ref => ref.orderBy('name'));

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
    const modal = await this.modalController.create({
      component: ModalPageComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
    });
    return await modal.present();
  }
  addData(data) {
    this.fsvc.setData('items', data);
  }
  getDate(date) {
    return date;
  }

}
