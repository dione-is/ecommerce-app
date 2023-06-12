import React from "react";
import currencyFormatter from 'currency-formatter';
import 'primeicons/primeicons.css';
        

export default props => {

    const rows = props.produtos.map(produto => {
        return (
            <tr key={produto.id}>
                <td>{<img width={50} height={50} src={`data:image/jpeg;base64,${produto.foto}`}/>}</td>
                <td>{produto.nome}</td>
                <td>{currencyFormatter.format(produto.preco, { locale: 'pt-BR' })}</td>
                <td>{produto.quantidade}</td>
                <td>
                    <button className="btn btn-outline-warning" style={{marginRight: 10}} type="button" onClick={e => props.adicionarCarrinho(produto)}><i className="pi pi-cart-plus" style={{ fontSize: '1rem' }}></i></button>
                    <button className="btn btn-outline-dark" style={{marginRight: 10}} type="button" onClick={e => props.editar(produto.id)}><i className="pi pi-pencil" style={{ fontSize: '1rem' }}></i></button>
                    <button className="btn btn-outline-danger" type="button" onClick={e => props.delete(produto)}><i className="pi pi-times" style={{ fontSize: '1rem' }}></i></button>
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Preço</th>
                    <th scope="col">estoque</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}