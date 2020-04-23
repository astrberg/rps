import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ShopPage } from './shop.page';

const routes: Routes = [
  { path: '', component: ShopPage },
  { path: 'post', loadChildren: '../post/post.module#PostPageModule' }

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShopPage]
})
export class ShopPageModule { }