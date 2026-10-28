import type { produto } from "../entities/produto";

export interface IProductDataSource {
    buscarPorCategoria(categoriaId: string): Promise<produto[]>;
    buscarPorId(id: string): Promise<produto | undefined>;
}
