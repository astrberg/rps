import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';


import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 'gl-ionic-background-video';

const routes: Routes = [
  { path: '', component: LoginPage },
  { path: 'signup', loadChildren: '../signup/signup.module#SignUpPageModule' },
  { path: 'about', loadChildren: '../about/about.module#AboutPageModule' },


];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [LoginPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class LoginPageModule { }