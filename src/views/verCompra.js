import React from "react";
import Card from "../components/card";
import CompraService from "../app/service/compraService";
import { withRouter } from 'react-router-dom';
import currencyFormatter from 'currency-formatter';

class VerCompra extends React.Component {

    state = {
        id: null,
        dataCompra: null,
        valorTotal: 0,
        itemCompra: [
            {
                id: null,
                produto: {},
                quantidade: 0
            }
        ]

    }

    constructor() {
        super();
        this.service = new CompraService();
    }

    componentDidMount() {
        const params = this.props.match.params;
        if (params.id) {
            this.buscarPorid(params.id);
        }
    }

    buscarPorid(id) {
        this.service.buscarPorId(id).then(response => {
            this.setState({
                id: response.data.id,
                dataCompra: response.data.dataCompra,
                valorTotal: response.data.valorTotal,
                itemCompra: response.data.itemCompra
            });
        })
    }

    cancelar = () => {
        this.props.history.push('/consulta-produto');
    }


    render() {
        return (
            <div className="container">
                <Card title={"Ver Compra"}>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                {
                                    this.state.itemCompra.map((e, index) => {
                                        return (
                                            <div key={index} className="container row">
                                                <div className="col-sm-1">
                                                    <img width={50} height={50} src={`data:image/jpeg;base64,${e.produto.foto}`} />
                                                </div>
                                                <div className="col-sm-6">
                                                    <p>x{e.quantidade} - {e.produto.nome} {currencyFormatter.format(e.produto.preco, { locale: 'pt-BR' })}</p>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                                <h6 style={{marginTop:30}}>Valor Total: {currencyFormatter.format( this.state.valorTotal,  { locale: 'pt-BR' })}</h6>
                                <div className='col-sm-12' style={{ marginTop: '20px' }}>
                                    <button type='button' className="btn btn-secondary " style={{ marginLeft: '20px' }} onClick={this.cancelar}>Voltar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}
export default withRouter(VerCompra);