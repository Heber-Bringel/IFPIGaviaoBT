import type { categoria } from "../model/entities/categoria";
import type { produto } from "../model/entities/produto";

export interface IMenuUseCases {
    buscarCategorias(): Promise<categoria[]>;
    buscarCardapio(categoriaId: string): Promise<{ categoria: categoria; produtos: produto[] }>;
    buscarProduto(produtoId: string): Promise<produto>;
    incrementarQuantidade(quantidade: number): number;
    decrementarQuantidade(quantidade: number): number;
}
