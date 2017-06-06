import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CoreProvider {

  public token= '';
  public server = 'http://localhost:1337' ;

  public  API_ENDPOINT = {
    API_REST_ENDPOINT: '/api',
    API_AUTHENTICATE : '/api/auth/signin',
    API_AUTH_FACEBOOK :  '/api/auth/facebook',
    API_FACEBOOK_CLIENT_ID: '162506894117176',
    API_SPOTIFY_CLIENT_ID: '5063d7fc578d4b928e96e050790860c9',
    API_SPOTIFY_CONNECT: 'api/connectspotify',
    API_OAUTH_CALLBACK: '/localhost/callback',
    API_SUGGESTIONS :  '/api/suggestions' ,
    API_SONGS :  '/api/song',
    API_USERS: '/api/user',
    API_USERS_ACCOUNTS: '/accounts',
    API_USER_PICTURE: '/picture',
    API_USER_PROFILE: '/profile',
    API_FEEDS: '/feeds',
    API_FEED_COMMENT: '/comments',
    API_CURRENT_BAND : '/currentband',
    API_BANDS: '/band',
    API_SEARCH_NEW_TRACK: '/searchtrack',
    API_ADD_MUSIXMATCH_TRACK:'/addmusicxmatch'
  };

  constructor(public http: Http) {
    console.log('Hello CoreProvider Provider');
  }

 

  //return http post response
  authenticate(data){
      let serverUrl = 'http://localhost:1337' + this.API_ENDPOINT.API_AUTHENTICATE; 
      let headers = new Headers();
      
      headers.append('Content-Type' , 'application/json');
      return  this.http.post(serverUrl,data, {headers:headers});
  }

  get(url){
      let serverUrl =  this.server; //this.SERVER_URL().API_URL;
      let headers = new Headers();

      headers.append('Content-Type' , 'application/json');
      headers.append('authorization', 'JWT ' + this.token);

      console.log(serverUrl + url);
      console.log(this.token);

      return  this.http.get(serverUrl + url, {headers: headers});
  }

  //return http post response
  post(url, data){
      let serverUrl =  this.server; //this.SERVER_URL().API_URL;
      let headers = new Headers();

      headers.append('Content-Type' , 'application/json');
      headers.append('Authorization', 'JWT ' + this.token);

      return  this.http.post(serverUrl + url, data, {headers:headers});
  }

  //return http post response
  put(url, data){
      let serverUrl =  this.server;
      let headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'JWT ' + this.token);

      return  this.http.put(serverUrl + url, data, {headers:headers});
  }

  //return http post response
  delete(url, data){
      let serverUrl =  this.server;
      let headers = new Headers();

      headers.append('Content-Type' , 'application/json');
      headers.append('Authorization', 'JWT ' + this.token);
      return  this.http.delete(serverUrl + url, {headers:headers} );
  }

  //Manage Storage to Session
  setStorage(key, value){
      localStorage[key] = value;
  }
  getStorage(key, defaultValue) {
      return localStorage[key] || defaultValue;
  }
  setStoreObject(key, value) {
      localStorage[key] = JSON.stringify(value);
  }
  getStoreObject(key) {
      return JSON.parse(localStorage[key] || '{}');
  }

}
