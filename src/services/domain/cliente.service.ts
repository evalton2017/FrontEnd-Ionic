import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteDTO } from 'src/models/cliente.dto';
import { API_CONFIG } from 'src/config/api.config';
import { StorageService } from '../storage.service';
import { PedidoDTO } from 'src/models/pedido.dto';
import { ImageUtilService } from '../image-util.service';


@Injectable()
export class ClienteService{

    pedido: PedidoDTO;

    constructor(
        public http:HttpClient,
        public storage:StorageService,
        public imageUtilService:ImageUtilService
        ){

    }

    findById(id:string){
        return this.http.get<any>(`${API_CONFIG.baseUrl}/clientes/${id}`)
    }

    findByEmail(email:string): Observable<any>{
        return this.http.get<any>(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`       
            );
    }

    getImageFromBucket(id: string):Observable<any>{
        let url =`${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url,{responseType:'blob'});
    }

    insert(obj: ClienteDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`,
            obj,
            {
                observe:'response',
                responseType:'text'
            }     
        );
    }

    setPedido(pedido: PedidoDTO){
        this.pedido=pedido;
    }

    getPedido(){
        return this.pedido;
    }

    uploadPicture(picture){
        
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData: FormData = new FormData()
        formData.append('file',pictureBlob, 'file.jpg');

        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes/picture`,
            formData,
            {
                observe:'response',
                responseType:'text'
            }     
        );

    }
   

}