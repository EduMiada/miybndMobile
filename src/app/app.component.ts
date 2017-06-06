import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserProvider } from '../providers/user/user';
import { LoginPage } from '../pages/login/login';

import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any; //TabsPage;
  pages:Array<{title:string, component:any}>;

  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, user: UserProvider) {
    let self = this;


    this.pages = [
        { title: 'Homepage', component: TabsPage },
        { title: 'Account', component: ProfilePage }
    ];


    let promise = new Promise(resolve => {
      resolve(user.isConnected());
    });

    promise.then(function(connected){
      console.log('user connected',connected);
      if (!connected){
        self.rootPage = LoginPage;
      }else{
        self.rootPage = TabsPage;
      }
    });

   
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

   openPage(page) {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.push(page.component);
    };
    
}
