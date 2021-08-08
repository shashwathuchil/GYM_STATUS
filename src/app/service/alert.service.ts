import { Injectable } from '@angular/core';
import { ModalController,AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertCtrl: AlertController) { }

  async alert(msg){
    let alert = await this.alertCtrl.create({
      header: msg,
      message: '8867515162',
      buttons: ['Dismiss']
    });
    await alert.present();
  }
}
