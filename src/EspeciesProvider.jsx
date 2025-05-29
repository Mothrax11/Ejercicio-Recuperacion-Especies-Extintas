import React, { createContext, useState, useEffect } from "react";
export const EspeciesContext = createContext();

export const EspeciesProvider = ({ children }) => {
    const [especiesItem, setEspeciesItem] = useState([]);
    const [coordenadasItem, setCoordenadasItem] = useState([]);

    useEffect(() => {
        const fetchEspecies = async () => {
            const response = await fetch('especies.json');
            const data = await response.json();
            setEspeciesItem(data)
        }
        fetchEspecies();

        const fetchCoordenadas = async () => {
            const response = await fetch('coordenadas.json');
            const data = await response.json();
            setCoordenadasItem(data)
        }
        fetchCoordenadas();
    }, []);

    return (
        <EspeciesContext.Provider value={{especiesItem, setEspeciesItem, coordenadasItem, setCoordenadasItem}}>
            {children}
        </EspeciesContext.Provider>
    );
};
