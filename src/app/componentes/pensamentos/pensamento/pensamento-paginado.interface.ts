import { Pensamento } from './pensamento.interface';

export interface PensamentoPaginado {
    total: number;
    linhas: Pensamento[];
}
