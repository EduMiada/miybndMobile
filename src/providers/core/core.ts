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
      API_PROJECTS: '/ppm/rest/v1/projects',
      API_RESOURCES: '/ppm/rest/v1/resources',
      API_TASKS: '/ppm/rest/v1/tasks'
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
      headers.append('authToken', this.token);

      console.log(serverUrl + url);
      console.log(this.token);

      return  this.http.get(serverUrl + url, {headers: headers});
  }

  //return http post response
  post(url, data){
      let serverUrl =  this.server; //this.SERVER_URL().API_URL;
      let headers = new Headers();

      headers.append('Content-Type' , 'application/json');
      headers.append('authToken', this.token);

      return  this.http.post(serverUrl + url, data, {headers:headers});
  }

  //return http post response
  put(url){
      let serverUrl =  this.server;
      let headers = new Headers();

      console.log('token', this.token);
      console.log('url', serverUrl + url);

      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('authToken', this.token);

      return  this.http.put(serverUrl + url, '', {headers:headers});
  }

  //return http post response
  delete(url, data){
      let serverUrl =  this.server;
      let headers = new Headers();

      headers.append('Content-Type' , 'application/json');
      headers.append('authToken', this.token);
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
