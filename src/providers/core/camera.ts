import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class CameraProvider {

  constructor(public camera: Camera) {
    console.log('Hello  CameraProvider Provider');
  }

  static get parameters(){
    return[[Camera]];
  }

  getPicture(options){
    if (!options){
        options = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false,
            correctOrientation:true
        };
    }

    return this.camera.getPicture(options)
      .then((imageData) => {
        let base64Image = "data:image/jpeg;base64," + imageData;
      },
      (err) => {
      });

  }
}
