import type { categoria } from "../../model/entities/categoria";
import type { ICategoryDataSource } from "../../model/datasources/iCategoryDataSource";
import { DataSourceError } from "../../model/errors";

const CategoriaBD: categoria[] = [
    {
        id: "1",
        nome: "Comidas",
        corBorda: "#501673",
        corSeta: "#501673",
        imagemUrl: require("../../../assets/images/menu/categoria-comidas.png"),
    },
    {
        id: "2",
        nome: "Bebidas",
        corBorda: "#1b873f",
        corSeta: "#1b873f",
        imagemUrl: require("../../../assets/images/menu/categoria-bebidas.png"),
    },
];

export class CategoriaDataSource implements ICategoryDataSource {
    private async consultar<T>(consulta: () => T): Promise<T> {
        try {
            await new Promise((resolve) => setTimeout(resolve, 600));
            return consulta();
        } catch {
            throw new DataSourceError("Não foi possível carregar categorias. Tente novamente.");
        }
    }

    buscarCategorias(): Promise<categoria[]> {
        return this.consultar(() => CategoriaBD.map((item) => ({ ...item })));
    }

    buscarPorId(id: string): Promise<categoria | undefined> {
        return this.consultar(() => {
            const item = CategoriaBD.find((categoria) => categoria.id === id);
            return item ? { ...item } : undefined;
        });
    }
}
