import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { Http, Headers} from '@angular/http';
import { Device } from '@ionic-native/device';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})




export class HomePage {

  constructor(public navCtrl: NavController, 
              private camera: Camera, 
              private http: Http, 
              public geolocation: Geolocation, 
              private device: Device) {
    
  }

  takePicture(){
    this.camera.getPicture({

        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.postIssue("data:image/jpeg;base64," + imageData);


    }, (err) => {
        console.log(err);
    });
  }


  postIssue(imageB64 : String) {
    this.geolocation.getCurrentPosition().then((resp) =>{
      this.makePostRequest(imageB64, resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {

      console.log('Error getting location', error);
    });
  }


  makePostRequest(imageB64 : String, latitude: number, longitude: number) {
        let demoQuery = 
        {
          "id_user": this.device.uuid,
          "category": "pothole",
          "status": "new",
          "comments": [
              {
                  "value": "hello world",
                  "date": "2017-05-12",
              }
          ],
          "location": {
              "lat": latitude,
              "lon": longitude
          },
          "image": imageB64
        };

        this.http.post("http://8215b58b.ngrok.io/dearmayor/dearmayor/", demoQuery, {headers: new Headers({'Content-Type': 'application/json'})})
        .subscribe(data => {
          console.log(data);
          console.log(data.json().data);
            
        }, error => {
            console.log(JSON.stringify(error.json()));
        });
    }

}
