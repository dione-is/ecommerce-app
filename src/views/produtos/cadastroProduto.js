import React from "react";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import ProdutoService from "../../app/service/produtoService";
import { mensagemSucesso, mensagemError } from "../../components/toastr";
import { withRouter } from 'react-router-dom';

class CadastroProduto extends React.Component {

    state = {
        id: '',
        nome: '',
        preco: '',
        quantidade: '',
        foto: '',
        atualizando: false,
        button: 'Salvar'
    }

    constructor() {
        super();
        this.service = new ProdutoService();
    }

    componentDidMount() {
        const params = this.props.match.params;
        console.log(params)
        if (params.id) {
            this.buscarPorid(params.id);
        }
    }

    buscarPorid(id) {
        this.service.buscarPorId(id).then(response => {
            this.setState({
                nome: response.data.nome,
                id: response.data.id,
                preco: response.data.preco,
                quantidade: response.data.quantidade,
                foto: response.data.foto,
                atualizando: true,
                button: "Atualizar"
            });
        })
    }

    salvar = () => {
        const msgsError = this.validar();

        if (msgsError && msgsError.length > 0) {
            msgsError.forEach((msg, i) => {
                mensagemError(msg);
            })
        } else {
            const produto = {
                id: this.state.id,
                nome: this.state.nome,
                preco: this.state.preco,
                quantidade: this.state.quantidade,
                foto: this.state.foto
            }
            if (produto.id) {
                this.atualizarProduto(produto);
            } else {
                this.salvarProduto(produto);
            }
        }
    }

    atualizarProduto(produto) {
        this.service.atualizar(produto)
            .then(response => {
                mensagemSucesso('Produto Atualizado com Sucesso.');
                this.props.history.push('/consulta-produto');
            })
            .catch(err => {
                console.log(err);
                mensagemError("Não foi possivel salvar o produto.");
            });
    }

    salvarProduto(produto) {
        this.service.salvar(produto)
            .then(response => {
                mensagemSucesso('Produto Cadastrado com Sucesso.');
                this.props.history.push('/consulta-produto');
            })
            .catch(err => {
                console.log(err);
                mensagemError("Não foi possivel salvar o produto.");
            });
    }

    validar() {
        const msgs = [];

        if (!this.state.nome) {
            msgs.push('O campo nome e obrigatorio');
        }
        if (!this.state.preco) {
            msgs.push('O campo preco e obrigatorio');
        }
        if (!this.state.quantidade && this.state.quantidade > 0) {
            msgs.push('O campo quantidade e Obrigatorio');
        }

        return msgs;
    }

    cancelar = () => {
        this.props.history.push('/consulta-produto');
    }

    onChangeFoto = e => {
        debugger;
        let file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
    };

    _handleReaderLoaded = e => {
        let binaryString = e.target.result;
        this.setState({
            foto: btoa(binaryString)
        });
    };


    render() {
        return (
            <div className="container">
                <Card title={this.state.atualizando ? " Atualizar Produto" : "Cadastro de Produto"}>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <FormGroup Label="Nome: *" htmlFor="exampleInputNome1" >
                                    <input type="text" className="form-control" id="exampleInputNome1"
                                        placeholder="Digite o Nome" name="nome" value={this.state.nome} onChange={(e) => this.setState({ nome: e.target.value })} />
                                </FormGroup>
                                <FormGroup Label="Preco: *" htmlFor="exampleInputPreco1">
                                    <input type="number" className="form-control" id="exampleInputPreco1" aria-describedby="PrecoHelp" style={{ width: 200 }}
                                        placeholder="Digite o Preco" name="preco" value={this.state.preco} onChange={(e) => this.setState({ preco: e.target.value })} />
                                </FormGroup>
                                <FormGroup Label="Quantidade: *" htmlFor="exampleInputQuantidade1">
                                    <input type="number" className="form-control" style={{ width: 200 }} id="exampleInputQuantidade1" placeholder="Quantidade" name="quantidade"
                                        value={this.state.quantidade} onChange={e => this.setState({ quantidade: e.target.value })} />
                                </FormGroup>
                                <FormGroup Label="Foto: " htmlFor="exampleInputFoto1">
                                    <div>
                                        <input
                                            style={{ width: 600 }}
                                            type="file"
                                            name="image"
                                            id="file"
                                            accept=".jpg, .jpeg, .png"
                                            onChange={e => this.onChangeFoto(e)}
                                        />
                                        {
                                            this.state.foto ?
                                                <img width={70} height={70} src={`data:image/jpeg;base64,${this.state.foto}`} />
                                                :
                                                null
                                        }

                                    </div>
                                </FormGroup>
                                <div className='col-sm-12' style={{ marginTop: '20px' }}>
                                    <button type='button' className="btn btn-primary" onClick={this.salvar}>{this.state.button}</button>
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
export default withRouter(CadastroProduto);