import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { Route } from '@angular/compiler/src/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private ctrlNav:NavController, private menu:MenuController) {
    
   }

   ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

  login(){
    this.ctrlNav.navigateForward('categorias');
  }
}
