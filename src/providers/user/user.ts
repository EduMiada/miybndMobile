import { Injectable } from '@angular/core';
import { CoreProvider } from '../core/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { CameraProvider} from '../core/camera';

//import 'rxjs/add/operator/map';


@Injectable()
export class UserProvider {
  public  profile =  {
          id: undefined,
          token: undefined,
          avatar:undefined,
          username: undefined,
          email: undefined,
          firstName: undefined,
          lastName: undefined,
          displayName: undefined,
          deviceId:undefined,
          bands: [],
          fb:false,
          facebookToken:false,
          spotifyToken:false,
          musicProfile: {about:'', instrument:'', experience:'', styles:[], influencies:[]},
          contact: {bio:'', city:'', area:'', zip:''},
          channels: [{channel:'', name:'', url:''}],
          chuckQuote: undefined
  }

  public server = '';
  public token = '';

  constructor(private core:CoreProvider, private camera:CameraProvider) {
    console.log('Hello UserProvider Provider');
  }

  // check if there's a user session present
  isConnected () {
    console.log('profile.token:', this.profile.token);
    // if this session is already initialized in the service
    if (this.profile.token) {
      console.log('User is has a valid token, is connected');
      return true;
    }
    else {
      // check if there's a session in localstorage from previous use.
      // if it is, pull into our service
      var user = this.core.getStoreObject('user');

      console.log('user object:', user);

      if (user.token) this.setSession(user, user.token);

      if (this.profile.token) {
          console.log('User has connected befere has a valid token', this.profile);
          return true;
      }
      else {
          // no user info in localstorage, reject
          console.log('User DONT have a valid token');
          return false;
      }
    } //end if
  }; //end func

  // attempt login
  authenticate (credentials) {
    let token = '';
  
    //call login method
    return this.core.authenticate(credentials)
      .map(res => {
          token=res.json().data.token; 
          this.setSession(res.json().data, token)})
      .map(res => token)
      .catch(this.handleError)
  };

  //load user profile to update maybe move to auth code -- change neeed to rest api
  getProfile () {

    console.log('Profile', this.profile);

    let url = this.core.API_ENDPOINT.API_USERS + '/' + this.profile.id;

    return this.core.get(url)
      .map(res => this.setProfile(res.json().data))
      .catch(this.handleError);
    };

  //hande http observer error
  handleError(error) {
    return Observable.throw(error.json().errorMessage || 'Server error');
  };

  setServerURL(token){
    this.core.token= token;
    this.profile.token = token;
  }

  getPicture(source){
    let options = {
        quality: 50,
        destinationType:0, // Camera.DestinationType.DATA_URL,
        sourceType: source, //Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: 0, //Camera.EncodingType.JPEG,
        saveToPhotoAlbum: false,
        correctOrientation:true
    };

    //let user = this.core.getStoreObject('user');

    return this.camera.getPicture(options)
      .then((imageData) => {
        let base64Image = "data:image/jpeg;base64," + imageData;
        this.setAvatar(base64Image)
        .subscribe(
          res => {  this.profile.avatar = base64Image
                    //user.data.picture = base64Image,
                   // this.core.setStoreObject('user', user);
                },
          err => err
        );

      },(err) => {
        return err;
      });

  }

  // attempt login or signup
  setAvatar (picture) {
    let url = this.core.API_ENDPOINT.API_USERS + '/' + this.profile.id + this.core.API_ENDPOINT.API_USER_PICTURE;
    let body = JSON.stringify({picture:picture});

    return this.core.post(url, body)
        .map(res => res.json())
        .catch(this.handleError);
  };

  //update profile
  updateProfile (profile, contact, channels) {
    let url = this.core.API_ENDPOINT.API_USERS + '/' + this.profile.id;

    let body = JSON.stringify({username: this.profile.displayName,
                                firstName: this.profile.firstName,
                                lastName: this.profile.lastName,
                                displayName: this.profile.displayName,
                                profile:profile, contact:contact, channels:channels});

    console.log(body);

    return this.core.put(url, body)
        .map(res => res.json())
      //  .map(data => this.setSession(data))
      //  .map(this.profile = data)
        .catch(this.handleError);
  };




  setProfile (data) {
    // //music profile
    this.profile.avatar = data.avatar || '';
    this.profile.musicProfile = data.profile;
    this.profile.contact = data.contact;
    this.profile.channels = data.channels;
    this.profile.bands = data.bands;
  };

  setSession (data, token) {
    console.log('user', data);

    this.profile.id = data.user.id || undefined;
    this.profile.token = data.token || undefined;
    this.profile.avatar = data.user.avatar || undefined;
    this.profile.username = data.user.username || undefined;
    this.profile.email = data.user.email || undefined;
    this.profile.firstName = data.user.firstName || undefined;
    this.profile.lastName = data.user.lastName || undefined;
    this.profile.displayName = data.user.displayName || undefined;
    this.profile.bands = data.user.bands || undefined;
    this.profile.chuckQuote = data.chuckQuote || undefined;
    this.profile.token = token || undefined;

    this.core.token = this.profile.token;
    this.core.setStoreObject('user', data.user);
    return this.profile;
  };

  //Authenticate user
  destroySession() {
    this.core.setStoreObject('user', {});
    this.core.token = undefined;
    this.profile.token = undefined;
    this.profile.username = undefined;
    this.profile.email = undefined;
  };

}
