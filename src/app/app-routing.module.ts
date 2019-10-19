import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'invite', pathMatch: 'full' },
  // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './authentication/login/login.module#LoginPageModule' },
  { path: 'create-account', loadChildren: './authentication/create-account/create-account.module#CreateAccountPageModule' },
  { path: 'recover-password', loadChildren: './authentication/recover-password/recover-password.module#RecoverPasswordPageModule' },
  { path: 'profile', loadChildren: './user/profile/profile.module#ProfilePageModule' },
  { path: 'settings', loadChildren: './user/settings/settings.module#SettingsPageModule' },
  { path: 'feed', loadChildren: './navigation/feed/feed.module#FeedPageModule' },
  { path: 'profile-user', loadChildren: './navigation/profile-user/profile-user.module#ProfileUserPageModule' },
  { path: 'invite', loadChildren: './user/invite/invite.module#InvitePageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
