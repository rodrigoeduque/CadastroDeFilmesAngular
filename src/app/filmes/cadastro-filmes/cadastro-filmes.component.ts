import { Alerta } from './../../shared/models/alerta';
import { AlertaComponent } from './../../shared/components/alerta/alerta.component';
import { FilmesService } from "./../../core/filmes.service";
import { Filme } from "./../../shared/models/filme";
import { ValidarCamposService } from "./../../shared/components/validar-campos.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { config } from 'rxjs';

@Component({
  selector: "dio-cadastro-filmes",
  templateUrl: "./cadastro-filmes.component.html",
  styleUrls: ["./cadastro-filmes.component.scss"],
})
export class CadastroFilmesComponent implements OnInit {
  cadastro: FormGroup;
  generos: Array<string>;

  constructor(
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private filmesService: FilmesService,
    private router: Router
  ) {}

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    this.cadastro = this.fb.group({
      titulo: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(255),
        ],
      ],
      urlFoto: ["", [Validators.minLength(10)]],
      dataLancamento: ["", [Validators.required]],
      descricao: [""],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDB: ["", [Validators.minLength(10)]],
      genero: ["", [Validators.required]],
    });

    this.generos = [
      "Ação",
      "Romance",
      "Aventura",
      "Drama",
      "Ficção Cientifica",
      "Comédia",
      "Terror",
    ];
  }

  submit(): void {
    this.cadastro.markAllAsTouched;

    if (this.cadastro.invalid) {
      return;
    }
    const filme = this.cadastro.getRawValue() as Filme;
    this.salvar(filme);
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private salvar(filme: Filme): void {
    this.filmesService.salvar(filme).subscribe(() => {
      const config = {
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar um novo filme',
          corBtnCancelar: 'primary',
          possuirBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
          this.router.navigateByUrl('filmes');
        } else {
          this.reiniciarForm();
        }
      });
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao salvar o registro!',
          descricao: 'Não conseguimos salvar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }
}
