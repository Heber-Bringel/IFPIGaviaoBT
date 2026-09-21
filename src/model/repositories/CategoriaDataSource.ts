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