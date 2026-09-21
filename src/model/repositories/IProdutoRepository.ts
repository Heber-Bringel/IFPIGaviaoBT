import { produto } from "../entities/produto";

export interface IProdutoRepository {
    buscarPorId(produtoId: string): Promise<produto>;
}