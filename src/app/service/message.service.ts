import { Injectable } from '@angular/core';
import { SMS } from '@ionic-native/sms/ngx';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private sms: SMS,) { }

  sendWhatsAppText() {
    let element = document.createElement('a') as HTMLElement;
    element.setAttribute('href', 'https://wa.me/919449058230?text=Hello%20How%20are%20you');
    element.setAttribute('style', 'display:none;');
    element.click();
  }
  sendTextSms(mNumber, msg) {
    return of(this.sms.send(mNumber, msg, {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: ''  // send SMS with the native android SMS messaging
        // intent: '' // send SMS without opening any other app
      }
    }));
  }
}
