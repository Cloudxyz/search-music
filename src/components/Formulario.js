import React, { useState } from 'react';
import Error from './Error';

const Formulario = ({guardarBusquedaLetra, guardarletraAnterior}) => {
    const [busqueda, guardarBusqueda] = useState({artista: '', cancion: ''});
    const [error, guardarError] = useState(false);

    const {artista, cancion} = busqueda;

    const actualizarState = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    const buscarInformation = e => {
        e.preventDefault();

        if(artista.trim() === '' || artista.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);

        guardarBusquedaLetra(busqueda);
    }
    
    return(
        <div className="bg-info">
            <div className="container">
                <div className="row">
                    <form className="col card text-white bg-transparent mb-5 pt-5 pb-2" onSubmit={buscarInformation}>
                        <fieldset>
                            <legend className="text-center">
                                Buscador Letras Canciones
                            </legend>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Artista</label>
                                        <input type="text" className="form-control" name="artista" placeholder="Nombre del Artista" onChange={actualizarState} value={artista}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Canción</label>
                                        <input type="text" className="form-control" name="cancion" placeholder="Nombre de la Canción" onChange={actualizarState} value={cancion}/>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary float-right">Buscar</button>
                        </fieldset>
                        { error ? <Error msg="Agregar una palabra para buscar"/> : null}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Formulario;