import { CategoriaDataSource } from "../infra/datasources/categoriaDataSource";
import { ProdutoDataSource } from "../infra/datasources/produtoDataSource";
import type { IMenuUseCases } from "../usecase/iMenuUseCases";
import { MenuUseCases } from "../usecase/menuUseCases";

export const menuUseCases: IMenuUseCases = new MenuUseCases(
    new CategoriaDataSource(),
    new ProdutoDataSource(),
);
