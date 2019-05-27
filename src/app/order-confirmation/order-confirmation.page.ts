import { Component, OnInit } from '@angular/core';
import { PedidoDTO } from 'src/models/pedido.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { CartItem } from 'src/models/cart-item';
import { CartService } from 'src/services/domain/cart.service';
import { ClienteDTO } from 'src/models/cliente.dto';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {

  pedido:PedidoDTO;
  cartItems:CartItem[];
  cliente:ClienteDTO;
  endereco:EnderecoDTO

  constructor(
    public clienteService:ClienteService,
    public cartService:CartService,
    public router:Router,

  ) {
    this.pedido=clienteService.getPedido();
   }

  ngOnInit() {
    this.cartItems= this.cartService.getCart().itens;
   
    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response =>{
        this.cliente = response;
        this.endereco =this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos'])
      },
      error=>{
        this.router.navigate(['home'])
      })
  }

  private findEndereco(id:string, list :EnderecoDTO[]):EnderecoDTO{
      let position = list.findIndex(x => x.id==id);
      return list[position];
  }

  total(){
    return this.cartService.total();
  }

}
