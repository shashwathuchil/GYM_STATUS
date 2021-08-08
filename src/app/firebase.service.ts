import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  item$: Observable<any[]>;
  constructor(public firestore: AngularFirestore) { }

  getData(path){
    this.item$ = this.firestore.collection(path).valueChanges();
    return this.item$;
  }
  getDataQuery(path,query){
    this.item$ = this.firestore.collection(path,query).valueChanges();
    return this.item$;
  }
  setData(path,data){
    const shirtsCollection = this.firestore.collection(path);
    shirtsCollection.add(data);
  }
}
