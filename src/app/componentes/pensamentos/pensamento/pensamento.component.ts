import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pensamento } from './pensamento.interface';

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
    autoria : ''
  }; 

  constructor(private router: Router) { }

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

}
