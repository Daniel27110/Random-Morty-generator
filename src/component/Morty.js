import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Morty = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Esta función se encarga de buscar los datos
    const fetchData = async () => {
        // Primero, ponemos loading en true
        setLoading(true);
        let result;
        do {
            // Generamos un ID aleatorio entre 1 y 800, que es el rango de personajes en la API
            const randomId = Math.floor(Math.random() * 800) + 1;
            // Hacemos la petición a la API de Rick and Morty
            result = await axios(`https://rickandmortyapi.com/api/character/${randomId}`);
            // Seguimos buscando hasta encontrar un morty
        } while (!result.data.name.toLowerCase().includes('morty'));

        // Guardamos los datos y ponemos loading en false
        setData(result.data);
        setLoading(false);
    };

    // Usamos useEffect para buscar los datos cuando se carga el componente
    useEffect(() => {
        fetchData();
        // Cambiamos el título de la página
        document.title = "Generador de Mortys aleatorios";
    }, []);


    return (
        <div>
            <h1 style={{ fontWeight: 'bold' }}>Generador aleatorio de Mortys</h1>

            {data ? (
                <div>
                    <h2>{data.name}</h2>
                    <img src={data.image} alt={data.name} />
                    <p>Estado: {data.status}</p>
                    <p>Especie: {data.species}</p>
                    <p>Género: {data.gender}</p>
                    <button
                        onClick={fetchData}
                        style={{ padding: '10px', backgroundColor: 'white', color: 'black', border: 'none', borderRadius: '5px' }}
                        disabled={loading}
                    >
                        {loading ? 'Cargando...' : 'Nuevo Morty aleatorio'}
                    </button>
                </div>
            ) : (
                // mostramos un mensaje de carga mientras esperamos un morty
                <p>Cargando...</p>
            )}
            <footer style={{ marginTop: '20px', fontSize: '14px', opacity: '0.5' }}> Made By Daniel Felipe Vargas - d.vargasu@uniandes.edu.co</footer>
        </div>
    );
};

export default Morty;