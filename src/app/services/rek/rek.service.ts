import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { RekModel } from 'src/app/model/rek.model';

@Injectable({
  providedIn: 'root'
})
export class RekService {
  constructor(private db: AngularFirestore) { }

  async createRek(rek: RekModel) {
    await this.db.collection('rekening').doc(rek.id.toString()).set({ ...rek });
  }

  getRek() {
    return this.db.collection('jenis_rekening').valueChanges() as Observable<any>;
  }
}
