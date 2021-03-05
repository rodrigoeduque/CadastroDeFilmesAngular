import { AlertaComponent } from './../../shared/components/alerta/alerta.component';
import { FilmesService } from "./../../core/filmes.service";
import { Filme } from "./../../shared/models/filme";
import { ValidarCamposService } from "./../../shared/components/validar-campos.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";

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
    this.cadastro.reset;
  }

  private salvar(filme: Filme): void {
    this.filmesService.salvar(filme).subscribe(() => {
      const dialogRef = this.dialog.open(AlertaComponent);
      
    }),
      () => {
        alert("Erro ao salvar");
      };

  }
}
