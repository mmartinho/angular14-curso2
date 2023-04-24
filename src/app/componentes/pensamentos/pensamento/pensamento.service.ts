import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';

import { Pensamento } from './pensamento.interface';
import { Observable, map } from 'rxjs';
import { PensamentoPaginado } from './pensamento-paginado.interface';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {
  private readonly API = 'http://localhost:3000/pensamentos';

  /** 
   * @param http injetado
   */
  constructor(private http: HttpClient) { }

  listar(pagina:number=1, limite:number=6): Observable<Pensamento[]> {
    let params = new HttpParams().set('_page', pagina).set('_limit', limite);
    return this.http.get<Pensamento[]>(this.API, {params, observe: 'body'});
  }

  listarPaginado(pagina:number=1, limite:number=6, qualquertexto:string='', favoritos=false): Observable<PensamentoPaginado> {
    var params = new HttpParams().set('_page', pagina).set('_limit', limite).set('q', qualquertexto);
    if(favoritos) {
      params = params.append('favorito', true);
    }
    return this.http.get(this.API, {params, observe: 'response'}).pipe(
      map((res)=>{
        const total = Number(res.headers.get('X-Total-Count'));
        const linhas = res.body as Pensamento[];
        return { total, linhas };
      })
    );
  }

  criar(pensamento: Pensamento) : Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  editar(pensamento: Pensamento) : Observable<Pensamento> {
    return this.http.put<Pensamento>(this.API + `/` + pensamento.id, pensamento);
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favorito = !pensamento.favorito;
    return this.editar(pensamento);
  }

  excluir(id: number): Observable<Pensamento> {
    return this.http.delete<Pensamento>(this.API + `/` + id);
  }

  buscarPorId(id: number): Observable<Pensamento> {
    return this.http.get<Pensamento>(this.API + `/` + id);
  }

}
