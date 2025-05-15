import { React, useContext, useState, useEffect} from "react";
import { Card } from "react-bootstrap";
import { EspeciesContext } from "./EspeciesProvider";
import { useParams } from "react-router";

function EspecieDetail(){

    const {especiesItem} = useContext(EspeciesContext)
    const {id} = useParams()
    const [especieElegida, setEspecieElegida]  = useState(null)

    useEffect(() => {
            const especie = especiesItem.find(especie => especie.id === parseInt(id));
            if (especie) {
                setEspecieElegida(especie);
            }    
           
        }, [id, especiesItem])

    if (!especieElegida) {
        return <p>Cargando especie...</p>;
    }
    return (
        <>
            <h1>{especieElegida.nombre}</h1>

        </>
    );
}
export default EspecieDetail;