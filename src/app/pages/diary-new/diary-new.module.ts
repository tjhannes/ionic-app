import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiaryNewPageRoutingModule } from './diary-new-routing.module';

import { DiaryNewPage } from './diary-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiaryNewPageRoutingModule
  ],
  declarations: [DiaryNewPage]
})
export class DiaryNewPageModule {}
