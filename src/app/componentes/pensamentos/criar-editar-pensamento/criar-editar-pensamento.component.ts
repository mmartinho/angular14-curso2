import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Pensamento } from '../pensamento/pensamento.interface';
import { PensamentoService } from '../pensamento/pensamento.service';
import { CustomValidator } from '../../../classes/custom-validator.class';

@Component({
  selector: 'app-criar-editar-pensamento',
  templateUrl: './criar-editar-pensamento.component.html',
  styleUrls: ['./criar-editar-pensamento.component.css']
})
export class CriarEditarPensamentoComponent implements OnInit {
  formulario!: FormGroup;
  pensamento!: Pensamento;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  private criarFormulario() {
    this.formulario = this.formBuilder.group({
      id : [],
      conteudo: ['', 
        Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/)
        ])
      ],
      autoria: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        CustomValidator.somenteMinusculas()
      ])],
      modelo: ['modelo1']
    });
  }

  ngOnInit(): void {
    this.criarFormulario();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      this.service.buscarPorId(id).subscribe({
        next: (pensamento)=>{
          this.pensamento = pensamento;
          this.formulario.setValue(this.pensamento);
        },
        error: (error) => {
          alert(error.message ? error.message : 'Não foi se comunicar com o servidor');
        },
        complete: () => {  
        }
      });
    } 
  }

  criarEditarPensamento() {
    if(this.pensamento && this.pensamento.id) {
      this.editarPensamento();
    } else {
      this.criarPensamento();
    }
  }

  criarPensamento() {
    if(this.formulario.valid) {
      this.service.criar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      });  
    }
  }

  editarPensamento() {
    if(this.formulario.valid && this.pensamento && this.pensamento.id) {
      this.service.editar(this.formulario.value).subscribe((pensamento)=>{
        this.router.navigate(['/listarPensamento']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }
}
