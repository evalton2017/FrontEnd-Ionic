import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { ProdutoService } from 'src/services/domain/produto.service';
import { API_CONFIG } from 'src/config/api.config';
import { CartService } from 'src/services/domain/cart.service';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {

  item:ProdutoDTO

  constructor(
    private route:ActivatedRoute,
    private produtoService:ProdutoService,
    private cartService:CartService,
    private router:Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((id:Params)=>{
      this.produtoService.findById(id.produto_id)
      .subscribe(
        (response)=>{
        this.item=response;
        this.getImageIfExists();
               
      },
      error=>{
      
      }); 
    });
  }

  getImageIfExists(){
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(response=>{
        this.item.imageUrl=`${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
      },
      error=>{
      
      });
    
  }

  adicionar(produto:ProdutoDTO){
    this.cartService.addProduto(produto);
    this.router.navigate(['cart']);

  }
  


}
