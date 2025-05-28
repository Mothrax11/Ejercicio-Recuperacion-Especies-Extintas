import React, { createContext, useState, useEffect } from "react";
export const EspeciesContext = createContext();

export const EspeciesProvider = ({ children }) => {
    const [especiesItem, setEspeciesItem] = useState([]);

    useEffect(() => {
        const fetchEspecies = async () => {
            const response = await fetch('especies.json');
            const data = await response.json();
            setEspeciesItem(data)
        }
        fetchEspecies();
    }, []);

    return (
        <EspeciesContext.Provider value={{especiesItem, setEspeciesItem}}>
            {children}
        </EspeciesContext.Provider>
    );
};
