import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http, Headers} from '@angular/http';
import { Device } from '@ionic-native/device';

/**
 * Generated class for the IssueSubmittedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-issue-submitted',
  templateUrl: 'issue-submitted.html',
})
export class IssueSubmittedPage {

  pageTitle : String = 'Submitting issue';
  statusMessage : String = 'We\'re uploading your issue, it shouldn\'t take long...';
  message_id : String;

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              private http: Http, 
              public geolocation: Geolocation, 
              private device: Device) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssueSubmittedPage');
    this.postIssue(this.navParams.get('image'));
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
          "category": "waste",
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

        this.http.post("http://dearmayor.inspirehep.net/dearmayor/dearmayor/", demoQuery, {headers: new Headers({'Content-Type': 'application/json'})})
        .subscribe(data => {
          this.statusMessage = 'Youhou! it\'s online. Thanks for changing the world';
          this.pageTitle = 'Issue Submitted';
          console.log(data);
          console.log(data.json().data);
          
        }, error => {
            console.log(JSON.stringify(error.json()));
        });
    }



}
