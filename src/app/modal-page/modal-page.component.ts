import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})
export class ModalPageComponent implements OnInit {
  @Output() modalController = new EventEmitter();
  constructor(public modal: ModalController) {

  }

  ngOnInit() {}

  dismiss(){
    this.modal.dismiss();
  }

}
