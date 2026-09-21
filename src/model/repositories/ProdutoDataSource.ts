import { produto } from "../entities/produto";
import { IProdutoRepository } from "./IProdutoRepository";

export const ProdutoBD: produto[] = [
    {
        id: "1",
        categoriaid: "1",
        categoriaNome: "Comida",
        nome: "Pastel de Carne",
        preco: 6.0,
        descricao: "Pastel frito na hora bem crocante e sequinho, com recheio farto de carne moída selecionada, temperada com cheiro verde e azeitonas.",
        proteinas: "14g",
        carboidratos: "32g",
        gorduras: "18g",
        imagemPequenaUrl: require("../../../assets/images/menu/pastel-de-carne.png"),
        imagemGrandeUrl: require("../../../assets/images/menu/pastel-de-carne.png"),
    },
    {
        id: "2",
        categoriaid: "1",
        categoriaNome: "Comida",
        nome: "Coxinha de Frango",
        preco: 7.0,
        descricao: "Clássica coxinha de frango com massa macia de batata, empanada crocante dourada por fora e recheio de peito de frango desfiado com requeijão.",
        proteinas: "18g",
        carboidratos: "38g",
        gorduras: "15g",
        imagemPequenaUrl: require("../../../assets/images/menu/coxinha-de-frango.png"),
        imagemGrandeUrl: require("../../../assets/images/menu/coxinha-de-frango.png"),
    },
    {
        id: "3",
        categoriaid: "1",
        categoriaNome: "Comida",
        nome: "Cuscuz com Ovo",
        preco: 8.0,
        descricao: "Tradicional cuscuz nordestino de milho flocado feito no vapor, servido quentinho com ovo frito na manteiga da terra e uma pitada de sal.",
        proteinas: "12g",
        carboidratos: "40g",
        gorduras: "9g",
        imagemPequenaUrl: require("../../../assets/images/menu/cuscuz-com-ovo.png"),
        imagemGrandeUrl: require("../../../assets/images/menu/cuscuz-com-ovo.png"),
    },
    {
        id: "4",
        categoriaid: "1",
        categoriaNome: "Comida",
        nome: "Arrumadinho Completo",
        preco: 14.0,
        descricao: "Carne de sol desfiada, arroz branco soltinho e creme de galinha caseiro.",
        proteinas: "22g",
        carboidratos: "45g",
        gorduras: "12g",
        imagemPequenaUrl: require("../../../assets/images/menu/arrumadinho-completo.png"),
        imagemGrandeUrl: require("../../../assets/images/menu/arrumadinho-completo-large.png"),
    },
    {
        id: "5",
        categoriaid: "2",
        categoriaNome: "Bebida",
        nome: "Suco de Laranja",
        preco: 7.0,
        descricao: "Suco 100% natural de laranjas frescas espremidas na hora, sem conservantes, servido com gelo bem refrescante.",
        proteinas: "2g",
        carboidratos: "26g",
        gorduras: "0g",
        imagemPequenaUrl: require("../../../assets/images/menu/suco-de-laranja.png"),
        imagemGrandeUrl: require("../../../assets/images/menu/suco-de-laranja.png"),
    },
    {
        id: "6",
        categoriaid: "2",
        categoriaNome: "Bebida",
        nome: "Refrigerante Lata",
        preco: 5.0,
        descricao: "Refrigerante geladíssimo em lata 350ml. Escolha entre Coca-Cola tradicional, Coca-Cola Zero ou Guaraná Antarctica.",
        proteinas: "0g",
        carboidratos: "37g",
        gorduras: "0g",
        imagemPequenaUrl: require("../../../assets/images/menu/refrigerante.png"),
        imagemGrandeUrl: require("../../../assets/images/menu/refrigerante.png"),
    },
    {
        id: "7",
        categoriaid: "2",
        categoriaNome: "Bebida",
        nome: "Café Expresso",
        preco: 4.0,
        descricao: "Café expresso curto encorpado e aromático, feito com grãos especiais moídos na hora, com crema espessa e sabor marcante.",
        proteinas: "0g",
        carboidratos: "1g",
        gorduras: "0g",
        imagemPequenaUrl: require("../../../assets/images/menu/cafe-expresso.png"),
        imagemGrandeUrl: require("../../../assets/images/menu/cafe-expresso.png"),
    },
    {
        id: "8",
        categoriaid: "2",
        categoriaNome: "Bebida",
        nome: "Suco de Acerola",
        preco: 6.5,
        descricao: "Suco de acerola com polpa pura, fonte concentrada de vitamina C e antioxidantes, servido com pedras de gelo.",
        proteinas: "1g",
        carboidratos: "15g",
        gorduras: "0g",
        imagemPequenaUrl: require("../../../assets/images/menu/suco-acerola.png"),
        imagemGrandeUrl: require("../../../assets/images/menu/suco-acerola.png"),
    },
];

export class ProdutoDataSource implements IProdutoRepository {
    public async buscarPorId(produtoId: string): Promise<produto> {
        const produto = ProdutoBD.find((produto: produto) => produto.id == produtoId);
        return produto!;
    }

    public async buscarPorCategoria(categoriaId: string): Promise<produto[]> {
        const produtos = ProdutoBD.filter((produto: produto) => produto.categoriaid == categoriaId);
        return produtos;
    }
}