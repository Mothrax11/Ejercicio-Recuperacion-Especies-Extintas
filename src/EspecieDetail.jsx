import { React, useContext, useState, useEffect} from "react";
import { Card } from "react-bootstrap";
import { EspeciesContext } from "./EspeciesProvider";
import { useParams, Link } from "react-router";

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
           <div style={{marginTop:"5%", marginBottom:"2%"}}>
                <Card style={{marginTop:"20px"}}>
                    <Card.Img src={`/${especieElegida.imagen}`}></Card.Img>
                    <Card.Title>{especieElegida.nombre}</Card.Title>
                    <Card.Body>
                        <p>
                            Periodo - {especieElegida.periodo}
                        </p>
                        <p>
                            Habitat - {especieElegida.habitat}
                        </p>
                        <p>
                        {especieElegida.causas.length > 1 ? "Causas de su extinción:" : "Causa de su extinción:"}
                        <ul>
                            {especieElegida.causas.map((causa, index) => ( 
                                <li key={index}>{causa}</li>
                            ))}
                        </ul>
                        </p>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}
export default EspecieDetail;