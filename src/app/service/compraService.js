import ApiService from "../apiservice";

class CompraService extends ApiService{

    constructor(){
        super('/api/compra');
    }

    buscarPorId(id){
        return this.get(`/${id}`);
    }

    salvar(compra){
        return this.post('/', compra);
    }
}
export default CompraService;