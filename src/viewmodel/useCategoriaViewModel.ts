import { useEffect, useState } from "react";
import { menuUseCases } from "../di/container";
import type { produto } from "../model/entities/produto";
import { DomainError } from "../model/errors";
import type { IMenuUseCases } from "../usecase/iMenuUseCases";

export function useCategoriaViewModel(id: string, useCases: IMenuUseCases = menuUseCases) {
    const [produtos, setProdutos] = useState<produto[]>([]);
    const [nomeCategoria, setNomeCategoria] = useState("Cardápio");
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        let ativo = true;
        setCarregando(true);
        setErro(null);
        setProdutos([]);
        setNomeCategoria("Cardápio");
        async function carregar() {
            try {
                const resultado = await useCases.buscarCardapio(id);
                if (!ativo) return;
                setProdutos(resultado.produtos);
                setNomeCategoria(resultado.categoria.nome);
            } catch (err) {
                if (ativo) setErro(err instanceof DomainError ? err.message : "Não foi possível carregar o cardápio. Tente novamente.");
            } finally {
                if (ativo) setCarregando(false);
            }
        }
        void carregar();
        return () => { ativo = false; };
    }, [id, useCases]);

    return { carregando, erro, produtos, nomeCategoria };
}
