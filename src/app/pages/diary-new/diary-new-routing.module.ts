import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiaryNewPage } from './diary-new.page';

const routes: Routes = [
  {
    path: '',
    component: DiaryNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiaryNewPageRoutingModule {}
