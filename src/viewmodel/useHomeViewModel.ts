import { useEffect, useState } from "react";
import { menuUseCases } from "../di/container";
import type { categoria } from "../model/entities/categoria";
import { DomainError } from "../model/errors";
import type { IMenuUseCases } from "../usecase/iMenuUseCases";

export function useHomeViewModel(useCases: IMenuUseCases = menuUseCases) {
    const [categorias, setCategorias] = useState<categoria[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        let ativo = true;
        setCarregando(true);
        setErro(null);

        async function carregar() {
            try {
                const resultado = await useCases.buscarCategorias();
                if (!ativo) return;
                setCategorias(resultado);
            } catch (err) {
                if (ativo) setErro(err instanceof DomainError ? err.message : "Não foi possível carregar o cardápio. Tente novamente.");
            } finally {
                if (ativo) setCarregando(false);
            }
        }
        void carregar();
        return () => { ativo = false; };
    }, [useCases]);

    return { carregando, erro, categorias };
}
