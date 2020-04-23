import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProfilePage } from './profile.page';

const routes: Routes = [
    { path: '', component: ProfilePage },
    { path: 'about', loadChildren: '../about/about.module#AboutPageModule' },
    { path: 'account', loadChildren: '../account/account.module#AccountPageModule' },
    { path: 'contacts', loadChildren: '../contacts/contacts.module#ContactsPageModule' },
    { path: 'favorites', loadChildren: '../favorites/favorites.module#FavoritesPageModule' },

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule { }