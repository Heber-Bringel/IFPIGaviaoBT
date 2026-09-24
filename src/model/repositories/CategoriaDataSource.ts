import { categoria } from "../entities/categoria";

export const CategoriaBD: categoria[] = [
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

class CategoriaDataSource {
    private DELAY_MS = 600;

    public async BuscarCategorias() {
        await new Promise((resolve) => setTimeout(resolve, this.DELAY_MS));
        return [...CategoriaBD];
    }

     public async buscarPorId(categoriaId: string): Promise<categoria | undefined> {                                                                                   
        await new Promise((resolve) => setTimeout(resolve, this.DELAY_MS));                                                                                           
        return CategoriaBD.find((cat) => cat.id === categoriaId);                                                                                                     
    } 
}

export const categoriaDataSource = new CategoriaDataSource();