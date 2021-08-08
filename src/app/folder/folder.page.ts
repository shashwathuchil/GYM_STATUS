import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';
// import a from '../../assets/data/user.json'
import _, { map } from 'underscore';
import { ModalController } from '@ionic/angular';
import { ModalPageComponent } from '../modal-page/modal-page.component';
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
    public modalController: ModalController) {
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
