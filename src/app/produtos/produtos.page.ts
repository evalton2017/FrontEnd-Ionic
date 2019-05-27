import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ProdutoService } from 'src/services/domain/produto.service';
import { API_CONFIG } from 'src/config/api.config';
import { LoadingController } from '@ionic/angular';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items:ProdutoDTO[];
  isLoading = false;
 

  constructor(
    private produtoService:ProdutoService,
    private route:ActivatedRoute,
    private router:Router,
    public loadController:LoadingController
    ) { }

  ngOnInit() {
    this.loadData();
    
  }

  loadData(){
    this.route.params.subscribe((id:Params)=>{
      this.presentLoading();
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

  showDetail(produto_id:string)
  {
    this.router.navigate(['produto-detail',{produto_id:produto_id}])
  }

  async presentLoading() {
    let loading = await this.loadController.create({
      message: 'Aguarde...'
    });
    await loading.present();
    await loading.dismiss();
    return loading;   
  }


  doRefresh(event) {
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
