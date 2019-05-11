import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ProdutoService } from 'src/services/domain/produto.service';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items:ProdutoDTO[];

  constructor(
    private produtoService:ProdutoService,
    private route:ActivatedRoute,
    ) { }

  ngOnInit() {
    
    this.route.params.subscribe((id:Params)=>{
      this.produtoService.findByCategoria(id.categoria_id)
      .subscribe(
        (response)=>{
        this.items=response['content'];
      },
      error=>{
      
      }); 
    });
  }

}
