import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-botao-reiniciar-carregamento',
  templateUrl: './botao-reiniciar-carregamento.component.html',
  styleUrls: ['./botao-reiniciar-carregamento.component.css']
})
export class BotaoReiniciarCarregamentoComponent implements OnInit {
  @Input()
  haMaisPensamentos: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
