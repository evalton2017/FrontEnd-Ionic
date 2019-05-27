import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { StorageService } from 'src/services/storage.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { Router } from '@angular/router';
import { PedidoDTO } from 'src/models/pedido.dto';
import { CartService } from 'src/services/domain/cart.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items:EnderecoDTO[];
  pedido:PedidoDTO;

  constructor(
    private storage:StorageService,
    private clienteService:ClienteService,
    private router:Router,
    private cartService:CartService,
    public navCrtl:NavController

  ) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response=>{
          this.items=response['enderecos'];
          let cart=this.cartService.getCart();
          this.pedido={
            cliente:{id:response['id']},
            enderecoDeEntrega:null,
            pagamento:null,
            //lambda que percorre a lista e retorna a quantidade e o id do produto
            itens: cart.itens.map(x=> {return {quantidade:x.quantidade ,produto:{id:x.produto.id}}})
          }
        },
        error=>{
          if(error.status ==403){
            this.router.navigate(['cart']);
          }
        });
    }else{
      this.router.navigate(['cart']);
    }
  }

  nextPage(item:EnderecoDTO){
    this.pedido.enderecoDeEntrega = {id:item.id};
    this.clienteService.setPedido(this.pedido);
    this.router.navigate(['payment']);    
     
  }



}
