import { HttpEvent, 
    HttpInterceptor, 
    HttpHandler, 
    HttpRequest, 
    HTTP_INTERCEPTORS,
    HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { AlertController } from '@ionic/angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private storage:StorageService, private alertCtrl:AlertController){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(request)
        .pipe(
            catchError( (error, caught) => { 
                let errorObj = error;
                if(errorObj.error){
                    errorObj=errorObj.error;
                }
                if(!errorObj.status){
                    errorObj = JSON.parse(errorObj);
                }

                console.log("erro detectado");
                console.log(errorObj)
                switch(errorObj.status){
                    case 401:
                    this.hendle401();
                    break;

                    case 403:
                    this.henddle403();
                    break;

                    default:
                    this.hendleDefaultError(errorObj)
                }
                return throwError(errorObj);
            })as any
        )
    }

    henddle403(){
        this.storage.setLocalUser(null);
    }
    async hendle401(){

        let alert = await this.alertCtrl.create({
            header: 'Erro: 403',
            subHeader: 'erro de autenticação',
            message: 'Usuario ou senha invalido.',
            buttons: ['OK']
            
        });
        await alert.present();
        
    }

    async hendleDefaultError(errorObj){

        let alert = await this.alertCtrl.create({
            header: 'Erro'+errorObj.status+': '+errorObj.error,
            subHeader: '',
            message: errorObj.message,
            buttons: ['OK']
            
        });
        await alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
} 
