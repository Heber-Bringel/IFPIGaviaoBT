import { CategoriaBD } from "../repositories/CategoriaDataSource";
import { IProdutoRepository } from "../repositories/IProdutoRepository";
import { ProdutoDataSource } from "../repositories/ProdutoDataSource";

class ProdutoService {
    private DELAY_MS = 600;

    constructor(private pRepo: IProdutoRepository) {}

    public async  simularConsultaCategorias() {
      await new Promise((resolve) => setTimeout(resolve, this.DELAY_MS));
      return [...CategoriaBD];
    }
    
    public async simularConsultaProdutosPorCategoria(categoriaId: string) {
      await new Promise((resolve) => setTimeout(resolve, this.DELAY_MS));
      return this.pRepo.buscarPorCategoria(categoriaId);
    }
    
    public async simularConsultaProdutoPorId(produtoId: string) {
      await new Promise((resolve) => setTimeout(resolve, this.DELAY_MS));
      return this.pRepo.buscarPorId(produtoId);
    }
}
const produtoRepository: IProdutoRepository = new ProdutoDataSource();
const produtoService: ProdutoService = new ProdutoService(produtoRepository);


export default { produtoService };