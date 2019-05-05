import { Injectable } from '@angular/core';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { LocalUser } from 'src/models/local_user';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService{

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
            token:tok
        };

        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null);
    }
}