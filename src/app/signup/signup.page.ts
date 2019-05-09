import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstadoService } from 'src/services/domain/estado.service';
import { CidadeService } from 'src/services/domain/cidade.service';
import { EstadoDTO } from 'src/models/estado.dto';
import { CidadeDTO } from 'src/models/cidade.dto';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formGroup: FormGroup;
  estados:EstadoDTO[];
  cidades:CidadeDTO[];

  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private estadoService:EstadoService,
    private cidadeService:CidadeService,
  ) {
    this.formGroup = this.formBuilder.group({
      nome:['Duke',[Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email:['duke@gmail.com ',[Validators.required, Validators.email]],
      tipo:['1',[Validators.required]],
      cpfOuCnpj:['032355666666',[Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha:['123',[Validators.required,Validators.minLength(6), Validators.maxLength(8)]],
      logradouro:['Rua 32',[Validators.required]],
      numero:['29',[Validators.required]],
      complemento:['',[]],
      bairro:['sao jose',[]],
      cep:['71566899',[Validators.required]],
      telefone1:['92556666',[Validators.required]],
      telefone2:['',[]],
      telefone3:['',[]],
      estadoId:[null,[Validators.required]],
      cidadeId:[null,[Validators.required]],

    });
   }

  ngOnInit() {
    this.estadoService.findAll()
      .subscribe(response=>{
        this.estados=response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error=>{
        
      }
      );
    
  }

  signupUser(){
    console.log("chegou aqui")
  }

  updateCidades(){
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
    .subscribe(response=>{
      this.cidades=response;
      this.formGroup.controls.cidadeId.setValue(null);
    },
    error=>{

    });
  }

}
