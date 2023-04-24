import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento/pensamento.interface';
import { PensamentoService } from '../pensamento/pensamento.service';
import { PensamentoPaginado } from '../pensamento/pensamento-paginado.interface';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  titulo: string = 'Meu Mural';
  paginado : PensamentoPaginado = {linhas: [], total: 0};
  pagina: number = 1;
  limite: number = 6;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;

  constructor(private service: PensamentoService) { }

  carregarLista() {
    this.service.listarPaginado(this.pagina, this.limite, this.filtro, this.favoritos).subscribe((paginado) => {
      this.paginado = paginado;
      this.haMaisPensamentos = paginado.linhas.length > 0;
      this.titulo = 
        this.filtro && !this.favoritos 
        ? 'Meu Mural - Filtrado' 
        : ( this.favoritos && !this.filtro 
            ? 'Só Favoritos' 
            : ( this.favoritos && this.filtro 
                ? 'Só Favoritos e Filtrado' 
                : 'Meu Mural'
              )
          );
    });
  }

  ngOnInit(): void {
    this.carregarLista();
  }

  carregarMaisPensamentos() {
    ++this.pagina;
    this.carregarLista();
  }

  reiniciarMaisPensamentos() {
    this.pagina = 1;
    this.carregarLista();
  }

  pesquisarPensamentos() {
    this.reiniciarMaisPensamentos();
  }

  alternaFavoritos() {
    this.favoritos = !this.favoritos;
    this.carregarLista();
  }
}
