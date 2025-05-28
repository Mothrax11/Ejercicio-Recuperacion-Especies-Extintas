import { React, useContext, useState, useEffect} from "react";
import { Card, CardTitle } from "react-bootstrap";
import { EspeciesContext } from "./EspeciesProvider";
import { useParams, Link } from "react-router";

function EspecieFiltradaDatos (){

    const {especiesItem} = useContext(EspeciesContext)
    const {periodo, habitat} = useParams()
    const [especiesFiltradas, setEspeciesFiltradas]  = useState([])

    useEffect(() => {
       let filtradas = especiesItem;
       
        if (periodo) {
            const periodoFormateado = String(periodo).replaceAll("-", " ");
            filtradas = filtradas.filter((especie) =>
                especie.periodo.includes(periodoFormateado)
            );
        }

        if (habitat) {
            const habitatFormateado = String(habitat).replaceAll("-", " ");
            filtradas = filtradas.filter((especie) =>
                especie.habitat.includes(habitatFormateado)
            );
        }
        setEspeciesFiltradas(filtradas);
    }, [especiesItem, periodo, habitat]);



    
    return (
        <>
            <div>
                {especiesFiltradas.map((currentEspecieFiltrada, index) => (
                    <Card key={index} style={{marginTop:"20px"}}>
                        
                        
                        <Card.Img src={`/${currentEspecieFiltrada.imagen}`}></Card.Img>
                        <Card.Title as={Link} to={`/especie/${currentEspecieFiltrada.id}`}>{currentEspecieFiltrada.nombre}</Card.Title>
                        <Card.Body>
                            <p>
                                Periodo - {currentEspecieFiltrada.periodo}
                            </p>
                            <p>
                                Habitat - {currentEspecieFiltrada.habitat}
                            </p>
                            <p>
                            {currentEspecieFiltrada.causas.length > 1 ? "Causas de su extinción:" : "Causa de su extinción:"}
                            <ul>
                                {currentEspecieFiltrada.causas.map((causa) => ( 
                                    <li>{causa}</li>
                                ))}
                            </ul>
                            </p>
                            
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </>
    );
}

export default EspecieFiltradaDatos;