import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  private isConnected     : {spotify:boolean,facebook:boolean};
  private instrumentList  : Array<any>;
  private channelList     : Array<any>;
  private experienceList  : Array<any>;
  private chip2 = ['teste', 'teste1', 'teste2'];


  constructor(public navCtrl: NavController, public navParams: NavParams,public user:UserProvider, 
              public actionSheetCtr:ActionSheetController, public alertCtr: AlertController) {
    this.isConnected     = {spotify:false,facebook:false};
    this.instrumentList  = [{code:'GUITAR', name:'Guitar'}, {code:'BASS',name:'Bass'}, {code:'VOCAL',name:'Vocal'}, {code:'DRUM',name:'Drum'}];
    this.channelList     = [{code:'YOUTUBE', name:'YouTube'}, {code:'SUNDCLOUD', name: 'SoundCloud'}];
    this.experienceList  = [{code:'BEGINNER', name:'Beginner'}, {code:'INTEMEDIATE', name:'Intermediate'}, {code:'ADVANCED', name:'Advanced'}, {code:'NINJA', name:'Ninja'}];
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.loadProfile();
  }

  loadProfile(){
    let result:any;
    this.user.getProfile()
      .subscribe(
        data => {result = data;  if(this.user.profile.spotifyToken) this.isConnected.spotify=true} ,
        err => console.log('Erro', err),
        () => console.log('user.profile', this.user.profile)
      );
  }

  updateProfile (){
    let result = [];
    this.user.updateProfile(this.user.profile.musicProfile,false, false)
    .subscribe(
      data => result = data,
      err => console.log('Erro', err),
      () =>   console.log('profile saved' )
    );
  };

  profileModal() {
    let alert = this.alertCtr.create({
    //  title: 'Say something about you',
    inputs: [
      {
        name: 'displayName',
        placeholder: 'display name',
        value: this.user.profile.displayName
      },
      {
        name: 'firstName',
        placeholder: 'first name',
        value: this.user.profile.firstName
      },
      {
        name: 'lastName',
        placeholder: 'last name',
        value: this.user.profile.lastName
      },
      {
        name: 'about',
        placeholder: 'say something about you',
        value: this.user.profile.musicProfile.about
      },

    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.user.profile.displayName = data.displayName;
          this.user.profile.firstName = data.firstName;
          this.user.profile.lastName = data.lastName;
          this.user.profile.musicProfile.about = data.about;
          this.updateProfile();

          //if (User.isValid(data.username, data.password)) {
            // logged in!
          //} else {
            // invalid login
        //    return false;
        //  }
        }
      }
    ]
  });
  alert.present();
  }

  takePicture(){
    let actionSheet = this.actionSheetCtr.create({
      title: 'Profile Picture',
      buttons: [
        {
          text: 'Remove',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Galery',
          handler: () => {
            this.user.getPicture(0);
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.user.getPicture(1);
          }
        },

        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();



  }
}
