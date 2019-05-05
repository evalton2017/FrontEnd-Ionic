import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { Route } from '@angular/compiler/src/core';
import { CredenciaisDTO } from 'src/models/credenciais.dto';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  creds:CredenciaisDTO={
    email:"",
    senha:""
  }

  constructor(private ctrlNav:NavController, private menu:MenuController) {
    
   }

   ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

  login(){
    console.log(this.creds);
    this.ctrlNav.navigateForward('categorias');
  }
}
