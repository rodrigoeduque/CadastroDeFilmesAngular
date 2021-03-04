import { ValidarCamposService } from './../../shared/components/validar-campos.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;
  generos: Array<string>

  constructor(public validacao: ValidarCamposService ,private fb: FormBuilder) { }

  get f(){
    return this.cadastro.controls;
  }

  ngOnInit() :void {

    this.cadastro = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      urlFoto: ['', [Validators.minLength(10)]],
      dataLancamento: ['', [Validators.required]],
      descricao: [''],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDB: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]]
    });

    this.generos = ['Ação', 'Romance', 'Aventura', 'Drama', 'Ficção Cientifica', 'Comédia', 'Terror'];

  }



  salvar() : void {
    this.cadastro.markAllAsTouched;
    this.cadastro.markAsDirty;
    

    if (this.cadastro.invalid){
      return ;
    }
    alert('Sucesso!! \n\n'+ JSON.stringify(this.cadastro.value,null,4));
  }

  reiniciarForm(): void{
    this.cadastro.reset;
  }

}
