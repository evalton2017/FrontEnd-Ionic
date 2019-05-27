import { Component, OnInit, } from '@angular/core';
import { PedidoDTO } from 'src/models/pedido.dto';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from 'src/services/domain/cliente.service';
import { PickAddressPage } from '../pick-address/pick-address.page';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  pedido:PedidoDTO;
  parcelas:number[]=[1,2,3,4,5,6,7,8,9,10];

  formGroup:FormGroup;  

  constructor(
    private router:Router,
    public formBuilder:FormBuilder,
    private route:ActivatedRoute,
    private clienteService:ClienteService
  
  ) 
  {   
    this.formGroup = this.formBuilder.group({
      numeroDeParcelas:[1,Validators.required],
      "@type":['pagamentoComCartao', Validators.required]
    });
   
  }

  ngOnInit() {
   
      
  }

  nextPage(){
    this.pedido=this.clienteService.getPedido();
    this.pedido.pagamento = this.formGroup.value;
    this.router.navigate(['order-confirmation'])
  }

}
