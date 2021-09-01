import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AplicativoPageRoutingModule } from './aplicativo-routing.module';

import { AplicativoPage } from './aplicativo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AplicativoPageRoutingModule
  ],
  declarations: [AplicativoPage]
})
export class AplicativoPageModule {}
