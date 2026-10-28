import { useEffect, useState } from "react";
import { menuUseCases } from "../di/container";
import type { produto } from "../model/entities/produto";
import { DomainError } from "../model/errors";
import type { IMenuUseCases } from "../usecase/iMenuUseCases";

export function useItemProdutoViewModel(id: string, useCases: IMenuUseCases = menuUseCases) {
    const [produto, setProduto] = useState<produto | null>(null);
    const [quantidade, setQuantidade] = useState(1);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        let ativo = true;
        setCarregando(true);
        setErro(null);
        setProduto(null);
        setQuantidade(1);
        async function carregar() {
            try {
                const resultado = await useCases.buscarProduto(id);
                if (!ativo) return;
                setProduto(resultado);
            } catch (err) {
                if (ativo) setErro(err instanceof DomainError ? err.message : "Não foi possível carregar o cardápio. Tente novamente.");
            } finally {
                if (ativo) setCarregando(false);
            }
        }
        void carregar();
        return () => { ativo = false; };
    }, [id, useCases]);

    function alterarQuantidade(acao: (atual: number) => number) {
        try {
            setQuantidade(acao(quantidade));
            setErro(null);
        } catch (err) {
            setErro(err instanceof DomainError ? err.message : "Não foi possível alterar a quantidade.");
        }
    }

    return { carregando, erro, produto, quantidade,
        incrementarQuantidade: () => alterarQuantidade((atual) => useCases.incrementarQuantidade(atual)),
        decrementarQuantidade: () => alterarQuantidade((atual) => useCases.decrementarQuantidade(atual)) };
}
