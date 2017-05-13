import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import { IssueSubmittedPage } from '../issue-submitted/issue-submitted';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})




export class HomePage {

  constructor(public navCtrl: NavController, 
              private camera: Camera) {
    
  }

  bypassPicture(){
    this.navCtrl.push(IssueSubmittedPage, {image:"data:image/jpeg;base64,"});
  }
  
  takePicture(){
    this.camera.getPicture({

        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.navCtrl.push(IssueSubmittedPage, {image:"data:image/jpeg;base64," + imageData});
    }, (err) => {
        console.log(err);
    });
  }


  

}
