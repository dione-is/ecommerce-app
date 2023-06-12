class LocalStorageService {
    static adicionarItem(chave, valor){
        localStorage.setItem(chave,  JSON.stringify(valor));
    }
    

    static obterItem(chave){
        return JSON.parse(localStorage.getItem(chave))
    }
}export default LocalStorageService;