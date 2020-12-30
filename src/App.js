import React, { Fragment, useEffect, useState } from "react";
import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Info from './components/Info';
import Error from './components/Error';

import axios from 'axios';

function App() {
  const [busquedaLetra, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState('');
  const [info, guardarInfo] = useState({});
  const [error, guardarError] = useState(false);

  useEffect(() => {
    if(Object.keys(busquedaLetra).length === 0) return;
    const consultarApiLetra = async () => {
      const { artista, cancion } = busquedaLetra;
      const url_letra = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url_info = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      axios.all([
        axios.get(url_letra),
        axios.get(url_info)
      ]).then(axios.spread((letra, informacion) => {
        guardarLetra(letra.data.lyrics);
        if (Object.keys(informacion).length === 0) return null;
        guardarInfo(informacion.data.artists[0]);
      })).catch(error => {
        guardarError(true);
      });
      guardarError(false);
    }
    consultarApiLetra();
  }, [busquedaLetra, letra])
 

  return (
    <Fragment>
      { error ? <Error msg="Ha ocurrido un error, favor de volverlo a intentar"/> : null}
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra}/>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info info={info} />
          </div>
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
