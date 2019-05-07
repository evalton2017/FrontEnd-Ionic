import { Injectable } from '@angular/core';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { JwtHelper } from 'angular2-jwt';
import { LocalUser } from 'src/models/local_user';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService{
   
    helper:JwtHelperService = new JwtHelperService();

    constructor(private http:HttpClient, private storage: StorageService){}

    autenticate(creds:CredenciaisDTO){
      return  this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe:'response',
                responseType:'text',

            });
    }

    successfulLogin(authorizationValue : string){
        let tok = authorizationValue.substring(7);
        let user: LocalUser = {
            token:tok,
            email:this.helper.decodeToken(tok).sub
        };

        this.storage.setLocalUser(user);
    }

    refreshToken(){
        return  this.http.post(
              `${API_CONFIG.baseUrl}/auth/refresh_token`,
              {},
              {
                  observe:'response',
                  responseType:'text',
  
              });
    }


    logout(){
        this.storage.setLocalUser(null);
    }
}