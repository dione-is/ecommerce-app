import ApiService from '../apiservice';

export default class ProdutoService extends ApiService {
    constructor() {
        super('/api/produto');
    }

    buscarPorNome(filtro) {
        let params = `/buscar-por?nome=${filtro}`;
        return this.getByNome(params);
    }

    buscarPorId(id){
        return this.get(`/${id}`);
    }

    buscarTodos(){
       return this.get("/");
    }

    deletar(id){
        return this.delete(`/${id}`);
    }

    salvar(produto){
        return this.post("/",produto);
    }

    atualizar(produto){
        return this.put("/", produto);
    }
}