import React from "react";
import Card from "../components/card";
import CompraService from "../app/service/compraService";
import { mensagemSucesso, mensagemError } from "../components/toastr";
import { withRouter } from 'react-router-dom';
import currencyFormatter from 'currency-formatter';
import LocalStorageService from "../app/service/localStorageService";

class CadastroCompra extends React.Component {

    state = {
        itens: [
            {
                id: null,
                compra: null,
                produto: {
                    id: null,
                    nome: null,
                    foto: null,
                    preco: null,
                    quantidade: null
                },
                quantidade: 0
            }
        ]
        ,
        quantidade: 0,
        valor: 0,
    }

    constructor() {
        super();
        this.service = new CompraService();
    }

    componentDidMount() {
        const params = this.props.match.params;
        const carrinho = LocalStorageService.obterItem('_carrinho');

        let list = [];
        let valorTotal = 0;
        for (let i = 0; i < carrinho.length; i++) {
            let itemCompra = {
                id: null,
                produto: carrinho[i],
                quantidade: 1,
                compra: null

            }
            list.push(itemCompra);
            valorTotal += carrinho[i].preco;
        }
        this.setState({ itens: list, valor: valorTotal });
    }

    add = (e, event) => {
        const itens = this.state.itens;
        let valorTotal = 0;
        itens.forEach((element, index) => {
            if (e.produto.id === element.produto.id) {
                let novo = {
                    compra: element.compra,
                    produto: element.produto,
                    quantidade: event.target.value,
                    id: element.id
                }
                this.setState(itens[index] = novo);
                valorTotal += element.produto.preco * event.target.value;
            }else{
                valorTotal += element.produto.preco * element.quantidade;
            }            
        });
        this.setState({valor: valorTotal});
    }

    finalizarCompra = () => {

        const compra = {
            id: null,
            itemCompra: this.state.itens,
            dataCompra: null,
            valorTotal: this.state.valor
        }

        this.service.salvar(compra).then((response) => {
            console.log(response)
            mensagemSucesso("Compra finalizada com sucesso.");
            LocalStorageService.adicionarItem('_carrinho', []);
            this.props.history.push(`/ver-compra/${response.data.id}`);
        }).catch((err) => {
            console.log(err);
            mensagemError(err.response.data.message);
        })
    }

    render() {
        const { itens } = this.state;
        return (
            <div className="">
                <Card title="Itens">
                    {
                        this.state.itens.map((e, index) => {
                            return (
                                <div key={index} className="container row col-sm-12" >
                                    <div className="col-sm-1">
                                        <img width={50} height={50} src={`data:image/jpeg;base64,${e.produto.foto}`} />
                                    </div>
                                    <div className="col-sm-6" style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", height: 50 }}>
                                        <h6 >{e.produto.nome + " - " + currencyFormatter.format(e.produto.preco, { locale: 'pt-BR' })}</h6>
                                    </div>
                                    <input type="number"
                                        className="form-control"
                                        style={{ width: 80 }}
                                        id="exampleInputQuantidade1"
                                        placeholder="Quantidade"
                                        name="quantidade"
                                        min={1}
                                        value={e.quantidade} onChange={(event) => this.add(e, event, index)} />
                                        <hr style={{marginTop: 10}}></hr>
                                </div>

                            )
                        })
                    }
                    <h5>Valor Total: {this.state.valor}</h5>
                    <button className="btn btn-primary" 
                            style={{marginTop: 30}}
                            onClick={this.finalizarCompra}> Finalizar Compra</button>
                </Card>
            </div>
        );
    }
}
export default withRouter(CadastroCompra);