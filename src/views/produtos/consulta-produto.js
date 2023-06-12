import React, { useEffect } from "react";
import { withRouter } from 'react-router-dom'
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentoTable from "./produtoTable";
import ProdutoService from "../../app/service/produtoService";
import LocalStorageService from "../../app/service/localStorageService";
import * as messages from "../../components/toastr";
import { Dialog } from 'primereact/dialog';
import 'primeicons/primeicons.css';


class ConsultaProduto extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        lancamentos: [],
        lancamentoDeletar: {},
        visibleDialogDelete: false,
        nome: '',
        produtos: [],
        produtoDeletar: {},
        carrinho: []
    }

    constructor() {
        super();
        this.service = new ProdutoService();
    }

    buscar = () => {
        if (this.state.nome != '') {
            this.service.buscarPorNome(this.state.nome).then(response => {
                this.setState({ produtos: response.data });
            }).catch(err => {
                console.log(err);
                messages.mensagemError("Erro ao buscar produtos por Nome.")
            })
        } else {
            this.service.buscarTodos().then(response => {
                this.setState({ produtos: response.data })
            }).catch(err => {
                console.log(err);
                messages.mensagemError("Erro ao buscar produtos")
            })
        }
    }

    editar = (id) => {
        this.props.history.push(`/novo-produto/${id}`);
    }

    delete = () => {
        const produto = this.state.produtoDeletar;

        this.service.deletar(produto.id).then(response => {
            const produtos = this.state.produtos;
            const index = produtos.indexOf(produto);
            produtos.splice(index, 1);

            this.setState({ produtos, visibleDialogDelete: false });
            messages.mensagemSucesso("Produto excluido.");
        }).catch(err => {
            this.setState({visibleDialogDelete: false})
            messages.mensagemError("Produtos que possuem vinculo com compras realizadas, não podem ser excluidos.");
        });
    }

    adicionarCarrinho = (produto) => {
        const carrinhoAtual = this.state.carrinho;
        const carrinho = [...carrinhoAtual, produto];
        this.setState({ carrinho: carrinho });
        messages.mensagemSucesso(produto.nome + " foi adicionado ao carrinho");
    }

    abrirDialogDelete = (produto) => {
        this.setState({ visibleDialogDelete: true, produtoDeletar: produto });
    }

    fecharDialogDelete = () => {
        this.setState({ visibleDialogDelete: false });
    }

    prepareCadastro = () => {
        this.props.history.push('/novo-produto');
    }

    teste = () => {
        const carrinho = this.state.carrinho;
        LocalStorageService.adicionarItem('_carrinho', carrinho);
        this.props.history.push(`/novo-usuario/`)
    }

    render() {

        return (
            <Card title="Consulta Produtos">
                <div className="row" >
                    <div className="col-md-12">
                        <div className="bs-component col-sm-6">
                            <FormGroup htmlFor="inputNome" Label="Nome: ">
                                <input type="text"
                                    className="form-control"
                                    id="inputNome"
                                    value={this.state.nome}
                                    onChange={e => this.setState({ nome: e.target.value })}
                                    placeholder="Digite o Nome do Prduto" />
                            </FormGroup>
                        </div>
                        <div style={{ marginTop: 20, padding: 0 }} className="container row">
                            <div className="col-sm-9">
                                <button type="button" className="btn btn-primary" style={{ marginRight: 10 }} onClick={this.buscar}>
                                    Buscar
                                </button>
                                <button type="button" className="btn btn-info" onClick={this.prepareCadastro}>Cadastrar</button>
                            </div>
                            <div className="col-sm-3 ">
                                {
                                    this.state.carrinho.length > 0 ?
                                        <button type="button"
                                            className="btn btn-warning "
                                            onClick={this.teste}>Carrinho <i className="pi pi-cart-plus" style={{ fontSize: '1rem' }}></i></button>
                                        :
                                        null
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentoTable
                                produtos={this.state.produtos}
                                delete={this.abrirDialogDelete}
                                editar={this.editar}
                                adicionarCarrinho={this.adicionarCarrinho} />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Excluir lancamento" visible={this.state.visibleDialogDelete} style={{ width: '50vw' }}
                        onHide={() => this.setState({ visibleDialogDelete: false })}>
                        <p className="m-0 ">
                            Tem certeza que deseja excluir esse Produto ?
                        </p>
                        <div style={{ marginTop: 30 }}>
                            <button className="btn btn-danger" onClick={this.delete} style={{ marginRight: 10 }}> Deletar</button>
                            <button className="btn btn-secondary" onClick={this.fecharDialogDelete}>cancelar</button>
                        </div>
                    </Dialog>
                </div>
            </Card>
        )
    }
}
export default ConsultaProduto;