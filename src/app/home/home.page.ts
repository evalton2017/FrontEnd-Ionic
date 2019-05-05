import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { Route } from '@angular/compiler/src/core';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { AuthService } from 'src/services/auth.service';


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

  constructor(
      private ctrlNav:NavController,
      private menu:MenuController,
      private auth:AuthService
      ) {
    
   }

   ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

  login(){
    this.auth.autenticate(this.creds)
      .subscribe(response =>{
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.ctrlNav.navigateForward('categorias');
      },
      error =>{
        alert(error.message)
      });    
  }
}
