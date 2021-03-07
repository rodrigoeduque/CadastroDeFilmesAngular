import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { debounceTime } from 'rxjs/operators';
import { ConfigParams } from './../../shared/models/config-params';
import { Filme } from './../../shared/models/filme';
import { FilmesService } from './../../core/filmes.service';


@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {
  readonly semFoto = 'https://lh3.googleusercontent.com/proxy/Y12Yi0jpr5f6fr-r0pD15qJf-K8NFho8B3D1Ne8pwrrsf6eqyrO_3udHkzVHwlglVcUIgo036dqcaSeYIbuSgHjtlWTgX3d1ejxDlNoGiqrOsX4DDUhLQWqUUWYQbxA05GWZJCvemcI';

  config:ConfigParams = {
    pagina:0,
    limit: 4
  }
  filmes: Filme[] = [];
  filtrosListagem : FormGroup;
  generos: Array<string>;

  constructor(private FilmesService : FilmesService, private fb: FormBuilder) { }

  ngOnInit() {
    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });

    this.filtrosListagem.get('texto').valueChanges.
    pipe(debounceTime(1000)).
    subscribe( (val: string) => {
      this.config.pesquisa = val;
      this.resetarConsulta();
      console.log('Houve alteração no valor texto para : ',val)
    })

    this.filtrosListagem.get('genero').valueChanges
    .pipe(debounceTime(1000))
    .subscribe( (val: string) => {
      this.config.campo = {tipo: 'genero', valor : val};
      this.resetarConsulta();
      console.log('Houve alteração no valor genero para : ',val)
    })
    this.generos = [
      "Ação",
      "Romance",
      "Aventura",
      "Drama",
      "Ficção Cientifica",
      "Comédia",
      "Terror",
    ]

    this.resetarConsulta();


  }

  onScroll():void {
    this.listarFilmes();
  }

  private listarFilmes(): void {
    this.config.pagina ++;
    this.FilmesService.listar(this.config).subscribe( (filmes : Filme[]) => this.filmes.push(...filmes));}

    private resetarConsulta(): void {
      this.config.pagina=0;
      this.filmes= [];
      this.listarFilmes();
    }
}


