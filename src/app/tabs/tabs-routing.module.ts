import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      // Tab 1
      {
        path: 'diary',
        children: [
          {
            path: '',
            loadChildren: () => import('./diary/diary.module').then( m => m.DiaryPageModule)
          },
          {
            path: 'new',
            loadChildren: () => import('../pages/diary-new/diary-new.module').then( m => m.DiaryNewPageModule)
          },
          {
            path: 'detail/:id',
            loadChildren: () => import('../pages/diary-detail/diary-detail.module').then( m => m.DiaryDetailPageModule)
          }
        ]
      },
      // Tab 2
      {
        path: 'meditation',
        children: [
          {
            path: '',
            loadChildren: () => import('./music/music.module').then( m => m.MusicPageModule)
          }
        ]
      },
      // Tab 3
      {
        path: 'skills',
        children: [
          {
            path: '',
            loadChildren: () => import('./skills/skills.module').then( m => m.SkillsPageModule)
          }
        ]
      },
      // Tab 4
      {
        path: 'me',
        children: [
          {
            path: '',
            loadChildren: () => import('./me/me.module').then( m => m.MePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'diary',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/diary',
    pathMatch: 'full'
  },
  {
    path: 'me',
    loadChildren: () => import('./me/me.module').then( m => m.MePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
