import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { API_CONFIG } from 'src/config/api.config';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  constructor(private categoriaService:CategoriaService) { }

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  items:CategoriaDTO[];

  ngOnInit() {

    this.categoriaService.findAll()
      .subscribe(response=>{
        this.items=response;
      },
      error =>{
    
      });

  }

}
