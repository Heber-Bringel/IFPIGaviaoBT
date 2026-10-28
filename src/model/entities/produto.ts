import type { ImagemSource } from "./imagem";

export type produto = {
    id: string;
    categoriaId: string;
    categoriaNome: string;
    nome: string;
    preco: number;
    descricao: string;
    proteinas: string;
    carboidratos: string;
    gorduras: string;
    imagemPequenaUrl: ImagemSource;
    imagemGrandeUrl: ImagemSource;
}