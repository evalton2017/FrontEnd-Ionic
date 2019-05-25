import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/models/cart-item';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/services/domain/produto.service';
import { API_CONFIG } from 'src/config/api.config';
import { CartService } from 'src/services/domain/cart.service';
import { ProdutoDTO } from 'src/models/produto.dto';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  items:CartItem[];

  constructor(
    public cartService:CartService,
    private router:Router,
    private produtoService:ProdutoService
  ) { }

  ngOnInit() {
    let cart = this.cartService.getCart();
    this.items = cart.itens;
    this.loadImageUrls();

  }

  loadImageUrls(){
    for(var i=0; i<this.items.length; i++){
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(response=>{
          item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`        
        },
        error=>{}
        )
    }
  }

  removeItem(produto:ProdutoDTO){
    this.items = this.cartService.removeProduto(produto).itens;
  }

  increaseQuantity(produto:ProdutoDTO){
    this.items=this.cartService.increaseQuantity(produto).itens;
  }

  decreaseQuantity(produto:ProdutoDTO){
    this.items=this.cartService.decreaseQuantity(produto).itens;
  }

  total():number{
    return this.cartService.total();
  }

  ngOn(){
    this.router.navigate(['categorias'])
  }

  checkout(){
    this.router.navigate(['pick-address'])
  }

}
