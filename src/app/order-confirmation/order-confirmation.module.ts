import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderConfirmationPage } from './order-confirmation.page';
import { PedidoService } from 'src/services/domain/pedido.service';

const routes: Routes = [
  {
    path: '',
    component: OrderConfirmationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    
  ],
  providers:[
    PedidoService
  ],
  declarations: [OrderConfirmationPage]
})
export class OrderConfirmationPageModule {}
