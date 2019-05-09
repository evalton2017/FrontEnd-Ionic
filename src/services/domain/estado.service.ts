import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {API_CONFIG} from '../../config/api.config';
import { Observable } from 'rxjs';
import { EstadoDTO } from 'src/models/estado.dto';

@Injectable()
export class EstadoService{
    
    constructor(private http: HttpClient){
    }

    findAll():Observable<EstadoDTO[]>{
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
        
    }
}