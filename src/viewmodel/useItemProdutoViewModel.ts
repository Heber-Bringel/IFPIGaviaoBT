import { produto } from "@/model/entities/produto";
import { produtoDataSource } from "@/model/repositories/ProdutoDataSource";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export type ProdutoState = {
    produto: produto | null;
    carregando: boolean;
    quantidade: number;
}

export type ProdutoActions = {
    incrementarQuantidade: () => void;
    decrementarQuantidade: () => void;
}

export function useItemProdutoViewModel(): ProdutoState & ProdutoActions {
    const [carregando, setCarregando] = useState<boolean>(true);
    const [produto, setProduto] = useState<produto | null>(null);
    const [quantidade, setQuantidade] = useState<number>(1);

    const { id } = useLocalSearchParams<{ id: string }>();

    async function carregarDetalhes() {
        if (!id) return;
        try {
            setCarregando(true);
            const prodId = Array.isArray(id) ? id[0] : id;
            const resultado = await produtoDataSource.buscarPorId(prodId);
            setProduto(resultado ?? null);
        } catch (erro) {
            console.error("Erro ao buscar detalhes do produto:", erro);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarDetalhes();
    }, [id]);

    // Ações de incremento e decremento (regras da ViewModel)                                                                                                                       
      function incrementarQuantidade() {                                                                                                                                              
        setQuantidade((prev) => prev + 1);                                                                                                                                            
      }                                                                                                                                                                               
                                                                                                                                                                                      
      function decrementarQuantidade() {                                                                                                                                              
        if (quantidade > 1) {                                                                                                                                                         
          setQuantidade((prev) => prev - 1);                                                                                                                                          
        }                                                                                                                                                                             
      }                                                                                                                                                                               
                                                                                                                                                                                      
      return {                                                                                                                                                                        
        // Estado                                                                                                                                                                     
        produto,                                                                                                                                                                      
        carregando,                                                                                                                                                                   
        quantidade,                                                                                                                                                                   
        // Ações                                                                                                                                                                      
        incrementarQuantidade,                                                                                                                                                        
        decrementarQuantidade,                                                                                                                                                        
      }; 
}