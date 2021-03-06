import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { UserBandsPage } from '../pages/user-bands/user-bands';
import { ProfilePage } from '../pages/profile/profile';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserProvider } from '../providers/user/user';
import { CoreProvider } from '../providers/core/core';
import { AuthProvider } from '../providers/auth/auth';
import { Camera } from '@ionic-native/camera';
import { CameraProvider} from '../providers/core/camera';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    UserBandsPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    UserBandsPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserProvider,
    CoreProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Camera,
    CameraProvider
    
  ]
})
export class AppModule {}
