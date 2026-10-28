import type { categoria } from "../entities/categoria";

export interface ICategoryDataSource {
    buscarCategorias(): Promise<categoria[]>;
    buscarPorId(id: string): Promise<categoria | undefined>;
}
