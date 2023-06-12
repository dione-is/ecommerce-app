import React from "react";
import { Route, Switch, HashRouter } from 'react-router-dom';
import ConsultaProduto from "../views/produtos/consulta-produto";
import CadastroProduto from "../views/produtos/cadastroProduto";
import cadastroCompra from "../views/cadastroCompra";
import verCompra from "../views/verCompra";
function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/consulta-produto" component={ConsultaProduto}></Route>
                <Route path="/novo-usuario/:carrinho?" component={cadastroCompra}></Route>
                <Route path="/novo-produto/:id?" component={CadastroProduto}></Route>
                <Route path="/ver-compra/:id" component={verCompra}></Route>
            </Switch>
        </HashRouter>
    );
}
export default Rotas;