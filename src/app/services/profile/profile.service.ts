import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { RegisterModel } from 'src/app/model/register.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private db: AngularFirestore) { }

  async updateUser(id: any, user: any) {
    await this.db.collection('profile').doc(`${id}`).update({ ...user });

  }
  async createUser(user: RegisterModel) {
    await this.db.collection('profile').doc(`${user.id}`).set({ ...user });
  }
  getUser(email: string) {
    return this.db.collection('profile', ref => ref.where('email', '==', email)).valueChanges() as Observable<RegisterModel[]>;
  }
  async updateUrlKTP(userId: number, url: string){
    await this.db.collection('profile').doc(`${userId}`).update({ktpUrl: url})
  }
  
  async updateUrlSKTM(userId: number, url: string){
    await this.db.collection('profile').doc(`${userId}`).update({sktmUrl: url})
  }
}
