import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Pensamento } from './pensamento.interface';
import { PensamentoService } from './pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent implements OnInit {
  
  @Input()
  pensamento : Pensamento = {
    id: 0,
    conteudo : '',
    modelo : '',
    autoria : '',
    favorito: false
  }; 

  /**
   * Componente filho recebendo dados do componente pai
   */
  @Input()
  favoritos: boolean = false;

  /** 
   * Componente filho emitindo uma saída para o pai 
   */
  @Output() 
  carregarLista: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private pensamentoService: PensamentoService) { }

  ngOnInit(): void {
  }

  larguraPensamento() : string {
    if(this.pensamento.conteudo && this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g';
    } else {
      return 'pensamento-p';
    }
  }

  excluir() {
    if(this.pensamento && this.pensamento.id) {
      this.router.navigate([`/pensamentos/excluirPensamento/${this.pensamento.id}`]);
    }
  }

  editar() {
    if(this.pensamento && this.pensamento.id) {
      this.router.navigate([`/pensamentos/editarPensamento/${this.pensamento.id}`]);
    }
  }

  iconeFavorito() : string {
    return this.pensamento.favorito ? 'ativo' : 'inativo';
  }

  alternarFavorito() {
    this.pensamentoService.mudarFavorito(this.pensamento).subscribe((pensamento => {
      this.pensamento = pensamento;
      /**
       * Se o componente pai estiver com os
       * favoritos ativos...
       */
      if(this.favoritos) {
        /**
         * ...peça para o pai recarregar a lista
         */
        this.carregarLista.emit(); 
      }
    }));
  }

}
