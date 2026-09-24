import { produto } from "@/model/entities/produto";
import { categoriaDataSource } from "@/model/repositories/CategoriaDataSource";
import { produtoDataSource } from "@/model/repositories/ProdutoDataSource";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export function useCategoriaViewModel() {
    const [carregando, setCarregando] = useState<boolean>(true);
    const [produtos, setProdutos] = useState<produto[]>([]);
    const [nomeCategoria, setNomeCategoria] = useState<string>("Cardápio");

    const { id } = useLocalSearchParams<{ id: string }>();

    async function carregarDados() {
        if (!id) return;
        try {
            setCarregando(true);
            const [resultadoProdutos, categoria] = await Promise.all([
                produtoDataSource.buscarPorCategoria(id),
                categoriaDataSource.buscarPorId(id),
            ]);
            setProdutos(resultadoProdutos);
            if (categoria) {
                setNomeCategoria(categoria.nome);
            }
        } catch (erro) {
            console.error("Erro ao buscar dados da categoria:", erro);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarDados();
    }, [id]);

    return {
        carregando,
        produtos,
        nomeCategoria,
    };
}