import React from "react";
import NavBarItem from "./navbar-item";

function NavBar() {
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavBarItem href='#/consulta-produto' label='Produtos'/>
                    </ul>
                    <ul className="navbar-nav">
                        <NavBarItem href='' label='Fale Conosco'/>
                    </ul>
                    <ul className="navbar-nav">
                        <NavBarItem href='' label='About'/>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default NavBar;