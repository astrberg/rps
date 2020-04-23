import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { ShopPageModule } from "../shop/shop.module";
import { ProfilePageModule } from "../profile/profile.module";
import { AboutPageModule } from "../about/about.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    ShopPageModule,
    ProfilePageModule,
    AboutPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}