import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from 'src/services/auth.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {title: 'Home', url: '/home',icon: ''},
    {title: 'Profile', url: '/profile'},
    {title: 'Categorias', url: '/categorias'},

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth:AuthService,
    private storage:StorageService
  ) 
  {
    this.initializeApp();
  }

  
  initializeApp() 
  {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  
  logout(){
    this.storage.setLocalUser(null);
  }
}

