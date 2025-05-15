import { React, useContext} from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router";
import { EspeciesContext } from "./EspeciesProvider";

function EspeciesDatos(){
    const { especiesItem } = useContext(EspeciesContext);
    
    return(
        <>
            <div>
                {especiesItem.map((especie, index) => (
                    <Card key={index} style={{marginTop:"20px"}}>
                        <Card.Img src={especie.imagen}></Card.Img>
                        <Card.Title as={Link} to={`/especie/${especie.id}`}>{especie.nombre}</Card.Title>
                        <Card.Body>
                            <p>
                                Periodo - {especie.periodo}
                            </p>
                            <p>
                                Habitat - {especie.habitat}
                            </p>
                            <p>
                            {especie.causas.length > 1 ? "Causas de su extinción:" : "Causa de su extinción:"}
                            <ul>
                                {especie.causas.map((causa) => ( 
                                    <li>{causa}</li>
                                ))}
                            </ul>
                            </p>
                            
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </>
    )       
}

export default EspeciesDatos;