import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  item$: Observable<any[]>;

  constructor(firestore: AngularFirestore) {
    this.item$ = firestore.collection('items').valueChanges();
    console.log(this.item$,firestore.collection('items') );

  }

  ngOnInit() {}

}
