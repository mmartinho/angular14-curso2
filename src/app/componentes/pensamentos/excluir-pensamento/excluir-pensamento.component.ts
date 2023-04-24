import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pensamento } from '../pensamento/pensamento.interface';
import { PensamentoService } from '../pensamento/pensamento.service';

@Component({
  selector: 'app-excluir-pensamento',
  templateUrl: './excluir-pensamento.component.html',
  styleUrls: ['./excluir-pensamento.component.css']
})
export class ExcluirPensamentoComponent implements OnInit {

  pensamento: Pensamento = {
    id: 0,
    conteudo : '',
    autoria: '',
    modelo: '',
    favorito: false
  }

  constructor(
    private service: PensamentoService, 
    private router: Router, 
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));  // ActivatedRoute.paramMap
    this.service.buscarPorId(id).subscribe((pensamento)=>{
      this.pensamento = pensamento;
    });
  }

  excluirPensamento() {
    if(this.pensamento && this.pensamento.id) {
      this.service.excluir(this.pensamento.id).subscribe((pensamento)=> {
        this.router.navigate(['/listarPensamento']);
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/listarPensamento']);
  }
}
