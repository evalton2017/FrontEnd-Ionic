import { Component, OnInit } from '@angular/core';
import { PedidoDTO } from 'src/models/pedido.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { CartItem } from 'src/models/cart-item';
import { CartService } from 'src/services/domain/cart.service';
import { ClienteDTO } from 'src/models/cliente.dto';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { Router } from '@angular/router';
import { PedidoService } from 'src/services/domain/pedido.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {

  pedido:PedidoDTO;
  cartItems:CartItem[];
  cliente:ClienteDTO;
  endereco:EnderecoDTO;
  codPedido: String;

  constructor(
    public clienteService:ClienteService,
    public cartService:CartService,
    public router:Router,
    public pedidoService:PedidoService

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

  checkout(){
    this.pedidoService.insert(this.pedido)
      .subscribe(response=>{
        this.cartService.createOrClearCart();
        this.codPedido = this.extractId(response.headers.get('location'))
      },
      error=>{
        if(error.status==403){
          this.router.navigate(['home'])
        }
      })
  }

  back(){
    this.router.navigate(['cart'])
  }

  categoria(){
    this.router.navigate(['categorias'])
  }

  //extrai o id da url 
  private extractId(location: string):string{
    //acha a posição da ultima barra
    let position = location.lastIndexOf('/')
    return location.substring(position+1, location.length)
  }

}
