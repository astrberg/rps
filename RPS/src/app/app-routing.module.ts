import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToTabs = () => redirectLoggedInTo(['tabs/shop']);

const routes: Routes = [
  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } }, // UNCOMMENT WHEN PUBLISHING
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToTabs } },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignUpPageModule' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }