import React from "react";
import Mensagem from "../views/mensagem";


function Visivel(props) {

    var assunto = '';


    console.log(props);
    if (props.opcao === 'sms') {
        return (
            <div >
                <button onClick={() => props.enviarSms()} className="btn btn-info" > enviar sms</button>
                <p >{props.mensagemResponseSms}</p>
            </div>
        )
    } else if (props.opcao === 'E-mail') {
        return (<div>
            <div >
                <button className="btn btn-info" onClick={() => props.enviarEmail()} >Enviar Email</button>
                <p >{props.mensagemResponseSms}</p>
            </div>
        </div>
        )
    }

    return (
        <div >
            <p >{props.mensagemResponseWpp}</p>
            <button onClick={() => props.enviarWhatsApp()} className="btn btn-info" style={{ marginRight: '20px' }} > enviar whatsApp</button>
        </div>
    )
} export default Visivel;