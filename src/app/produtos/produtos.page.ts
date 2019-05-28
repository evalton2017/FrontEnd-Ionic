import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ProdutoService } from 'src/services/domain/produto.service';
import { API_CONFIG } from 'src/config/api.config';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items:ProdutoDTO[]=[];
  isLoading = false;
  page:number=0;
   

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
     this.produtoService.findByCategoria(id.categoria_id, this.page,5)
     .subscribe(
       (response)=>{
       let start = this.items.length;
       this.items=this.items.concat(response['content']);  
       let end = this.items.length-1;
       console.log(this.page)
       console.log(this.items)
       this.loadImageUrls(start,end)
       
     },
     error=>{
     }); 
   });
  }

  loadImageUrls(start:number, end:number){
    for(var i=start; i<end; i++){
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
    this.page=0;
    this.items=[];
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  loadInfinit(event) {
    this.page++;
    this.loadData()
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      if (this.items.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

}
