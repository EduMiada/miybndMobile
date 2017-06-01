import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserBandsPage } from './user-bands';

@NgModule({
  declarations: [
    UserBandsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserBandsPage),
  ],
  exports: [
    UserBandsPage
  ]
})
export class UserBandsPageModule {}
