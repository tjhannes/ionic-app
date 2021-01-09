import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./questions/start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'question',
    loadChildren: () => import('./questions/startup/startup.module').then( m => m.StartupPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./questions/start/start.module').then( m => m.StartPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
