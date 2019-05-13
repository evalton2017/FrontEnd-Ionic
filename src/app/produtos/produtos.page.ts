import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ProdutoService } from 'src/services/domain/produto.service';
import { API_CONFIG } from 'src/config/api.config';


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
    private router:Router
    ) { }

  ngOnInit() {
    
    this.route.params.subscribe((id:Params)=>{
      this.produtoService.findByCategoria(id.categoria_id)
      .subscribe(
        (response)=>{
        this.items=response['content'];
        this.loadImageUrls()
        
      },
      error=>{
      
      }); 
    });
  }

  loadImageUrls(){
    for(var i=0; i<this.items.length; i++){
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response=>{
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`        
        },
        error=>{}
        )
    }
  }

  showDetail(){
    this.router.navigate(['produto-detail'])
  }

}
