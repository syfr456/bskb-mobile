import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: AngularFireStorage
  ) { }

  uploadImageForSupportDoc(type: string, userId: string, dataUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const storageRef = this.storage.ref(`document/${userId}/${type}.jpeg`);
      this.encodeImageUri(dataUrl, (image64) => {
        storageRef.putString(image64, 'data_url', { contentType: 'image/jpeg' })
          .then(snapshot => {
            snapshot.ref.getDownloadURL()
              .then(res => resolve(res))
          }, err => {
            reject(err);
          })
      })
    })
  }

  private encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };
}
