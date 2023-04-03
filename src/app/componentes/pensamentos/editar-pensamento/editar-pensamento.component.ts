import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pensamento } from '../pensamento/pensamento.interface';
import { PensamentoService } from '../pensamento/pensamento.service';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  pensamento : Pensamento = {
    id: 0,
    conteudo : '',
    autoria : '',
    modelo : ''
  };
  
  constructor(
    private service: PensamentoService, 
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.buscarPorId(id).subscribe((pensamento)=>{
      this.pensamento = pensamento;
    });
  }

  editarPensamento() {
    if(this.pensamento && this.pensamento.id) {
      this.service.editar(this.pensamento).subscribe((pensamento)=>{
        this.router.navigate(['/listarPensamento']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }

}
