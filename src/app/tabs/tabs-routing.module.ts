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
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule)
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
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
          }
        ]
      },
      // Tab 3
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () => import('./tab3/tab3.module').then( m => m.Tab3PageModule)
          }
        ]
      },
      // Tab 4
      {
        path: 'tab4',
        children: [
          {
            path: '',
            loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/tab1',
    pathMatch: 'full'
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
