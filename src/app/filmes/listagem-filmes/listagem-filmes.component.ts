import { Filme } from './../../shared/models/filme';
import { FilmesService } from './../../core/filmes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  filmes: Filme[] = [];
  pagina=0;
  readonly qtdPorPagina=4;

  constructor(private FilmesService : FilmesService) { }

  ngOnInit() {
    this.listarFilmes();

  }

  onScroll():void {
    this.listarFilmes();
  }

  private listarFilmes(): void {
    
    this.pagina++;
    this.FilmesService.listar(this.pagina,this.qtdPorPagina).subscribe( (filmes : Filme[]) => this.filmes.push(...filmes) );}
  
  

}
