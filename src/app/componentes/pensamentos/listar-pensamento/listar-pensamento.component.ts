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

  paginado : PensamentoPaginado = {linhas: [], total: 0};
  pagina: number = 1;
  limite: number = 6;
  haMaisPensamentos: boolean = true;
  filtro: string = '';

  constructor(private service: PensamentoService) { }

  private carregarLista() {
    this.service.listarPaginado(this.pagina, this.limite, this.filtro).subscribe((paginado) => {
      this.paginado = paginado;
      this.haMaisPensamentos = paginado.linhas.length > 0;
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
}
