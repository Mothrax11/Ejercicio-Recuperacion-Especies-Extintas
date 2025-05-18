import { React, useContext, useState, useEffect} from "react";
import { Card, CardTitle } from "react-bootstrap";
import { EspeciesContext } from "./EspeciesProvider";
import { useParams, Link } from "react-router";

function EspecieFiltradaDatos (){

    const {especiesItem} = useContext(EspeciesContext)
    const {periodo} = useParams()
    const [periodoElegido, setPeriodoElegido]  = useState("")
    const [especiesFiltradas, setEspeciesFiltradas]  = useState([])

    useEffect(() => {
        const periodoFormateado = String(periodo).replaceAll("-", " ");
        const especiesFiltradasTemp = especiesItem.filter(
            especie => especie.periodo.includes(periodoFormateado)
        );
        setEspeciesFiltradas(especiesFiltradasTemp);
    }, [especiesItem, periodo]);




    return (
        <>
            <div>
                {especiesFiltradas.map((currentEspecieFiltrada, index) => (
                    <Card key={index} style={{marginTop:"20px"}}>
                        {console.log(currentEspecieFiltrada)}
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