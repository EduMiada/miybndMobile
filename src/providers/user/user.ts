import { Injectable } from '@angular/core';
import { CoreProvider } from '../core/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
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
          chuckQuote: undefined
  }

  public server = '';
  public token = '';

  constructor(private core:CoreProvider) {
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

  // getProfile(userName, token){
  //   let filter = '(uniqueName = \'' + userName + '\')';
  //   let activeFilter = '((isActive = true) and ' +  filter + ')';
  //   let fields = '&fields=fullName,firstName,lastName';
  //   let url = this.core.API_ENDPOINT.API_RESOURCES +  '?filter=' + activeFilter + fields;

  //   console.log('get profile token', this.core.token);

  //   return this.core.get(url)
  //     .map(res => res.json()._results[0])
  //     .map(res => this.setSession(res,null))
  //     .catch(this.handleError);
  // }

  //hande http observer error
  handleError(error) {
    return Observable.throw(error.json().errorMessage || 'Server error');
  };

  setServerURL(token){
    this.core.token= token;
    this.profile.token = token;
  }

  setSession (data, token) {
    console.log('user', data);

    this.profile.id = data.user.ID || undefined;
    this.profile.token = data.token || undefined;
    this.profile.avatar = data.user.avatar || undefined;
    this.profile.username = data.user.username || undefined;
    this.profile.email = data.user.email || undefined;
    this.profile.firstName = data.user.firstName || undefined;
    this.profile.lastName = data.user.lastName || undefined;
    this.profile.displayName = data.user.displayName || undefined;
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
