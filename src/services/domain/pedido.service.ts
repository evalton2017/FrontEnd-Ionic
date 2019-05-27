import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {API_CONFIG} from '../../config/api.config';
import { Observable } from 'rxjs';
import { PedidoDTO } from 'src/models/pedido.dto';
import { Router } from '@angular/router';

@Injectable()
export class PedidoService{
    
    constructor(
        private http: HttpClient,
        private router:Router
        ){
    }

    insert(obj:PedidoDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/pedidos`,
            obj,
            {
                observe:'response',
                responseType:'text'
            }
        )
    }
}