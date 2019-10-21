import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "recover-password", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then(m => m.HomePageModule)
  },
  {
    path: "login",
    loadChildren: "./authentication/login/login.module#LoginPageModule"
  },
  {
    path: "create-account",
    loadChildren:
      "./authentication/create-account/create-account.module#CreateAccountPageModule"
  },
  {
    path: "recover-password",
    loadChildren:
      "./authentication/recover-password/recover-password.module#RecoverPasswordPageModule"
  },  { path: 'my-profile', loadChildren: './profile/my-profile/my-profile.module#MyProfilePageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
