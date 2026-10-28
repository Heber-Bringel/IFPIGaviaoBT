import type { ICategoryDataSource } from "../model/datasources/iCategoryDataSource";
import type { IProductDataSource } from "../model/datasources/iProductDataSource";
import { ValidationError } from "../model/errors";
import type { IMenuUseCases } from "./iMenuUseCases";

export class MenuUseCases implements IMenuUseCases {
    constructor(
        private readonly categorias: ICategoryDataSource,
        private readonly produtos: IProductDataSource,
    ) {}

    buscarCategorias() {
        return this.categorias.buscarCategorias();
    }

    async buscarCardapio(categoriaId: string) {
        const id = this.validarId(categoriaId);
        const [categoria, produtos] = await Promise.all([
            this.categorias.buscarPorId(id),
            this.produtos.buscarPorCategoria(id),
        ]);
        if (!categoria) throw new ValidationError("Categoria não encontrada.");
        return { categoria, produtos };
    }

    async buscarProduto(produtoId: string) {
        const produto = await this.produtos.buscarPorId(this.validarId(produtoId));
        if (!produto) throw new ValidationError("Item não encontrado.");
        return produto;
    }

    incrementarQuantidade(quantidade: number) {
        this.validarQuantidade(quantidade);
        if (quantidade === Number.MAX_SAFE_INTEGER) {
            throw new ValidationError("Quantidade máxima atingida.");
        }
        return quantidade + 1;
    }

    decrementarQuantidade(quantidade: number) {
        this.validarQuantidade(quantidade);
        return Math.max(1, quantidade - 1);
    }

    private validarId(id: string) {
        if (typeof id !== "string" || !id.trim()) {
            throw new ValidationError("Informe um identificador válido.");
        }
        return id.trim();
    }

    private validarQuantidade(quantidade: number) {
        if (!Number.isSafeInteger(quantidade) || quantidade < 1) {
            throw new ValidationError("A quantidade deve ser um inteiro maior ou igual a 1.");
        }
    }
}
