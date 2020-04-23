import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';


const routes: Routes = [
    {
      path: "tabs",
      component: TabsPage,
      children: [
        {
          path: "shop",
          children: [
            {
              path: "",
              loadChildren: "./../shop/shop.module#ShopPageModule"
            },
            {
              path: "post",
              loadChildren: "./../post/post.module#PostPageModule"
            },
          ]
        },
        {
          path: "profile",
          children: [
            {
              path: "",
              loadChildren: "./../profile/profile.module#ProfilePageModule"
            },
            {
                path: "account",
                loadChildren: "./../account/account.module#AccountPageModule"
            },
            {
                path: "contacts",
                children: [
                  {
                    path: "",
                    loadChildren: "./../contacts/contacts.module#ContactsPageModule"
                  },
                  {
                    path: "chat",
                    loadChildren: "./../chat/chat.module#ChatPageModule"
                  },
                ]
            },
            {
                path: "favorites",
                loadChildren: "./../favorites/favorites.module#FavoritesPageModule"
            }
          ]
        }
      ]
    },
    {
      path: "",
      redirectTo: "/tabs/shop",
      pathMatch: "full"
    }
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }