import { categoria } from "@/model/entities/categoria";
import { categoriaDataSource } from "@/model/repositories/CategoriaDataSource";
import { useEffect, useState } from "react";

export function useHomeViewModel() {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [categorias, setCategorias] = useState<categoria[]>([]);

  async function carregarCategorias() {
      try {
        setCarregando(true);
        const resultado = await categoriaDataSource.BuscarCategorias();
        setCategorias(resultado);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      } finally {
        setCarregando(false);
      }
    }

  useEffect(() => {
    carregarCategorias();
  }, []);

  return {
    categorias,
    carregando,
  };

}