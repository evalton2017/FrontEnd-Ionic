import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { ClienteDTO } from 'src/models/cliente.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { API_CONFIG } from 'src/config/api.config';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cliente:ClienteDTO;
  picture:String;
  cameraOn:boolean=false;

  constructor(
    private storage:StorageService,
    private clienteService:ClienteService,
    private router:Router,
    private camera:Camera,
  ) { }

  ngOnInit() {
    this.loadData()
  }

  loadData(){
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
        .subscribe(respose=>{
          this.cliente=respose;
          this.getImageIfExists();
        },
        error=>{
          if(error.status ==403){
            this.router.navigate(['home']);
          }
        });
    }else{
      this.router.navigate(['home']);
    }
  }

  getImageIfExists(){
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response=>{
        this.cliente.imageUrl=`${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      },
      error=>{
      
      });
    
  }

  getCameraPicture(){
    this.cameraOn=true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/jpeg;base64,' + imageData;
     this.cameraOn=false;
    }, (err) => {
     
    });
  }

  getGalleryPicture(){
    this.cameraOn=true;
    const options: CameraOptions = {
      quality: 100,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/jpeg;base64,' + imageData;
     this.cameraOn=false;
    }, (err) => {
     
    });
  }

  sendPicture(){
    this.clienteService.uploadPicture(this.picture)
      .subscribe(response=>{
        this.picture= null;
        this.loadData()
      },
      error=>{

      });
  }

  

}
