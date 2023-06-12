import 'bootswatch/dist/cerulean/bootstrap.css';
import React from 'react';
import '../custom.css';
import Rotas from '../main/rotas';
import NavBar from '../components/nav-bar';
import 'toastr/build/toastr.css';
import 'toastr/build/toastr.min.js';
import 'primereact/resources/themes/lara-light-indigo/theme.css';    
import 'primereact/resources/primereact.min.css';   
import 'primeicons/primeicons.css'; 

class App extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <div className='container'>
          <Rotas />
        </div>
      </>
    )
  }
}


export default App;
