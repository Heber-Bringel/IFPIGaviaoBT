import { produto } from "../entities/produto";
import { IProdutoRepository } from "./IProdutoRepository";

export const ProdutoBD: produto[] = [];

export class ProdutoDataSource implements IProdutoRepository {
    public async buscarPorId(produtoId: string): Promise<produto> {
        const produto =  ProdutoBD.find((produto: produto) => produto.id == produtoId);
        return produto!;
    }

    public async buscarPorCategoria(categoriaId: string): Promise<produto[]> {
        const produtos = ProdutoBD.filter((produto: produto) => produto.categoriaid == categoriaId);
        return produtos;
    }

}