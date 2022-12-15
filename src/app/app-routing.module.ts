import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'contact-details/:id',
    loadChildren: () =>
      import('./contact-details/contact-details.module').then(
        (m) => m.ContactDetailsPageModule
      ),
  },
  {
    path: 'new-contact',
    loadChildren: () =>
      import('./new-contact/new-contact.module').then(
        (m) => m.NewContactPageModule
      ),
  },
  {
    path: 'update-contact/:id',
    loadChildren: () =>
      import('./update-contact/update-contact.module').then(
        (m) => m.UpdateContactPageModule
      ),
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
