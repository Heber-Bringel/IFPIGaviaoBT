import type { ImagemSource } from "./imagem";

export type categoria = {
    id: string;
    nome: string;
    corBorda: string;
    corSeta: string;
    imagemUrl: ImagemSource;
}